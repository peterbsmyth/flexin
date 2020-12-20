import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SetStatistic, Workout } from '@bod/shared/models';
import { OnChange } from '@bod/shared/utils';
import { merge, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';

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

  @Output() saveWorkout: EventEmitter<Partial<Workout>> = new EventEmitter();
  @Output() saveSet: EventEmitter<Partial<SetStatistic>> = new EventEmitter();
  form: FormGroup = this.fb.group({});

  get sets() {
    return <FormArray>this.form.get('sets');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  /**
   * buildForm
   * Each time the workout changes the form needs to be reset according to the dictates of the workout
   * and related statistics. uses _formSaveable to prevent valueChanges subscription from firing after setControl
   * @param workout { Workout };
   */
  buildForm(workout: Workout): void {
    this._formSaveable = false;
    const rpe = workout?.rpe ?? 0;
    const athleteNotes = workout?.athleteNotes ?? '';
    const sets = this.fb.array([]);
    workout.setStatistics?.forEach((setStatistic) => {
      const setReps = setStatistic.reps ?? 0;
      const setWeight = setStatistic.weight ?? 0;
      const control = this.fb.group({
        id: setStatistic.id,
        set: setStatistic.set,
        reps: this.fb.control(setReps),
        weight: this.fb.control(setWeight),
      });
      sets.push(control);
    });

    this.form.setControl('sets', sets);
    this.form.setControl('rpe', this.fb.control(rpe));
    this.form.setControl('athleteNotes', this.fb.control(athleteNotes));

    this._formSaveable = true;

    /**
     * save for the Workout related properties
     */
    this.form
      .get('athleteNotes')
      .valueChanges.pipe(
        filter(() => this._formSaveable),
        debounceTime(300),
        takeUntil(this.unsubscribe$),
        tap((athleteNotes) => {
          const output: Partial<Workout> = {
            id: this.workout.id,
            athleteNotes,
          };
          this.saveWorkout.emit(output);
        })
      )
      .subscribe();

    this.form
      .get('rpe')
      .valueChanges.pipe(
        filter(() => this._formSaveable),
        debounceTime(300),
        takeUntil(this.unsubscribe$),
        tap((value) => {
          const output: Partial<Workout> = {
            id: this.workout.id,
            rpe: value,
          };
          this.saveWorkout.emit(output);
        })
      )
      .subscribe();

    /**
     * save for individual SetStatistics
     */
    merge(...this.sets.controls.map((c) => c.valueChanges))
      .pipe(
        filter(() => this._formSaveable),
        debounceTime(300),
        takeUntil(this.unsubscribe$),
        tap((value) => this.saveSet.emit(value))
      )
      .subscribe();
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
    this.form.get('rpe').setValue(null, { emitEvent: false });
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
