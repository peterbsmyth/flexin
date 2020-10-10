import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import {
  SessionItemBoardCardData,
  SessionItemCardOutput,
} from '@bod/training/domain';
import { Subject } from 'rxjs';
import { debounceTime, tap, takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'training-session-item-card',
  templateUrl: './session-item-card.component.html',
  styleUrls: ['./session-item-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionItemCardComponent implements OnInit, OnDestroy {
  private _formSaveable = false;
  private unsubscribe$: Subject<any> = new Subject();
  private _data: SessionItemBoardCardData;
  @Input()
  get data(): SessionItemBoardCardData {
    return this._data;
  }
  set data(data: SessionItemBoardCardData) {
    this._data = data;
    this.buildForm(data);
  }
  @Output() save: EventEmitter<SessionItemCardOutput> = new EventEmitter();
  form: FormGroup = this.fb.group({});

  get sets() {
    return <FormArray>this.form.get('sets');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        filter(() => this._formSaveable),
        debounceTime(300),
        takeUntil(this.unsubscribe$),
        tap((value) => this.onSave(value))
      )
      .subscribe();
  }

  /**
   * arrayOfCount is used to turn the amount of sets into an array
   * @param n length of the Array
   */
  arrayOfCount(n: number): any[] {
    return Array(n).fill(null);
  }

  /**
   * buildForm
   * Each time the session item changes the form needs to be reset according to the dictates of the session item
   * and related statistics. uses _formSaveable to prevent valueChanges subscription from firing after setControl
   * @param data { SessionItemBoardCardData };
   */
  buildForm(data: SessionItemBoardCardData): void {
    this._formSaveable = false;
    const rpe = data?.sessionItemStatistic?.rpe ?? 0;
    const notes = data?.sessionItemStatistic?.notes ?? '';
    const sets = this.fb.array([]);
    this.arrayOfCount(data.sessionItem.sets).forEach((s, i) => {
      const setStatistic = data.setStatistics[i];
      const setReps = setStatistic?.reps ?? 0;
      const setWeight = setStatistic?.weight ?? 0;
      const control = this.fb.group({
        set: i + 1,
        reps: this.fb.control(setReps),
        weight: this.fb.control(setWeight),
      });
      sets.push(control);
    });

    this.form.setControl('sets', sets);
    this.form.setControl('rpe', this.fb.control(rpe));
    this.form.setControl('notes', this.fb.control(notes));

    if (!data.sessionItemStatistic) {
      this.form.disable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
    }
    this._formSaveable = true;
  }

  /**
   * onRepsFocus
   * when a rep is focused then set its value to null so that a user can change the number
   * without clearing the previous number
   * @param i { number };
   */
  onRepsFocus(i) {
    this.sets.controls[i].get('reps').setValue(null, { onlySelf: true });
  }

  /**
   * onRepsBlur
   * when a rep is blureed then check if it's still null from the focus handler
   * if its not null then the user input a number and the form will be saved with the latest value
   * @param i { number };
   */
  onRepsBlur(i) {
    const control = this.sets.controls[i].get('reps');
    const reps = this.data.setStatistics[i]?.reps ?? 0;

    if (control.value === null) {
      control.setValue(reps, {
        onlySelf: true,
      });
    }
  }

  /**
   * onRpeFocus
   * when a rpe is focused then set its value to null so that a user can change the number
   * without clearing the previous number
   * @param i { number };
   */
  onRpeFocus() {
    this.form.get('rpe').setValue(null, { onlySelf: true });
  }

  /**
   * onRpeBlur
   * when a rpe is blureed then check if it's still null from the focus handler
   * if its not null then the user input a number and the form will be saved with the latest value
   * @param i { number };
   */
  onRpeBlur(i) {
    const control = this.form.get('rpe');
    const rpe = this.data.sessionItemStatistic?.rpe ?? 0;

    if (control.value === null) {
      control.setValue(rpe, {
        onlySelf: true,
      });
    }
  }

  onSave(value: {
    rpe: number;
    notes: string;
    sets: {
      id?: number;
      set: number;
      reps: number;
      weight: number;
    }[];
  }) {
    const sessionItemStatisticId = !!this.data.sessionItemStatistic
      ? this.data.sessionItemStatistic.id
      : undefined;
    const output: SessionItemCardOutput = {
      sessionItemStatistic: {
        id: sessionItemStatisticId,
        rpe: value.rpe,
        notes: value.notes,
        sessionItemId: this.data.sessionItem.id,
      },
      setStatistics: value.sets.map((s, i) => ({
        id: this.data.setStatistics[i]?.id,
        sessionItemStatisticId,
        ...s,
      })),
    };
    this.save.emit(output);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
