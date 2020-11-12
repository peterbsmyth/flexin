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
import { Subject } from 'rxjs';
import { debounceTime, tap, takeUntil, filter } from 'rxjs/operators';
import { OnChange } from '@bod/shared/utils';
import { Workout } from '@bod/shared/models';

@Component({
  selector: 'training-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: ['./workout-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutCardComponent implements OnInit, OnDestroy {
  private _formSaveable = false;
  private unsubscribe$: Subject<any> = new Subject();

  @OnChange<Workout>(function (workout) {
    this.buildForm(workout ?? {});
  })
  @Input()
  workout: Workout;

  @Output() save: EventEmitter<Partial<Workout>> = new EventEmitter();
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
   * Each time the workout changes the form needs to be reset according to the dictates of the workout
   * and related statistics. uses _formSaveable to prevent valueChanges subscription from firing after setControl
   * @param workout { Workout };
   */
  buildForm(workout: Workout): void {
    this._formSaveable = false;
    const rpe = workout?.rpe ?? 0;
    const notes = workout?.athleteNotes ?? '';
    const sets = this.fb.array([]);
    this.arrayOfCount(workout.setCount).forEach((s, i) => {
      const setStatistic = workout.setStatistics[i];
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

    this._formSaveable = true;
  }

  /**
   * onSetFocus
   * when a rep is focused then set its value to null so that a user can change the number
   * without clearing the previous number
   * @param { string } controlName "reps" or "weight"
   * @param { number } i index
   */
  onSetFocus(controlName, i) {
    this.sets.controls[i].get(controlName).setValue(null, { onlySelf: true });
  }

  /**
   * onSetBlur
   * when a rep is blureed then check if it's still null from the focus handler
   * if its not null then the user input a number and the form will be saved with the latest value
   * @param { string } controlName "reps" or "weight"
   * @param { number } i index
   */
  onSetBlur(controlName, i) {
    const control = this.sets.controls[i].get(controlName);
    const reps = this.workout.setStatistics[i]?.reps ?? 0;

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
   */
  onRpeFocus() {
    this.form.get('rpe').setValue(null, { onlySelf: true });
  }

  /**
   * onRpeBlur
   * when a rpe is blureed then check if it's still null from the focus handler
   * if its not null then the user input a number and the form will be saved with the latest value
   */
  onRpeBlur() {
    const control = this.form.get('rpe');
    const rpe = this.workout.rpe ?? 0;

    if (control.value === null) {
      control.setValue(rpe, {
        onlySelf: true,
      });
    }
  }

  onSave(value: {
    rpe: number;
    athleteNotes: string;
    sets: {
      id?: number;
      set: number;
      reps: number;
      weight: number;
    }[];
  }) {
    const workoutId = this.workout.id;
    const output: Partial<Workout> = {
      id: this.workout.id,
      rpe: value.rpe,
      athleteNotes: value.athleteNotes,
      setStatistics: value.sets.map((s, i) => ({
        id: this.workout.setStatistics[i]?.id,
        workoutId,
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
