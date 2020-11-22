import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  tap,
  takeUntil,
  distinctUntilChanged,
  debounceTime,
} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Exercise, Workout } from '@bod/shared/models';
import { OnChange } from '@bod/shared/utils';
import { ExerciseDialog } from '../exercise-dialog/exercise.dialog';

@Component({
  selector: 'training-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  form: FormGroup = this.fb.group({
    reps: this.fb.control(1, [Validators.required]),
    amrap: this.fb.control(false, [Validators.required]),
    sets: this.fb.control(1, [Validators.required, Validators.min(1)]),
    weight: this.fb.control(0, [Validators.required]),
    intensity: this.fb.control('', [Validators.required]),
    tempo: this.fb.control('', [Validators.required]),
    leftRight: this.fb.control(false, [Validators.required]),
  });
  public leftRight: boolean;

  @OnChange<Workout>(function (data) {
    this.buildForm(data);
  })
  @Input()
  workout: Workout;

  @OnChange<boolean>(function (editable) {
    if (!editable) {
      this.disableInputs();
    } else {
      this.enableInputs();
    }
  })
  @Input()
  editable;

  @Output() update: EventEmitter<Workout> = new EventEmitter();
  @Output() updateExercise: EventEmitter<Exercise> = new EventEmitter();
  @Output() validate: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.form
      .get('amrap')
      .valueChanges.pipe(
        takeUntil(this.unsubscribe$),
        tap((amrap) => {
          if (amrap) {
            this.form.get('reps').setValue(0);
            this.form.get('reps').disable();
          } else {
            this.form.get('reps').setValue(1);
            this.form.get('reps').enable();
          }
        })
      )
      .subscribe();

    this.form.statusChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((status) => {
          switch (status) {
            case 'VALID': {
              this.validate.emit(true);
              return;
            }
            default: {
              this.validate.emit(false);
              return;
            }
          }
        })
      )
      .subscribe();

    this.form.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        distinctUntilChanged(),
        debounceTime(300),
        tap((value) => {
          const data: Workout = {
            ...this.workout,
            ...value,
            reps: value.reps ? value.reps : 0,
          };
          this.update.emit(data);
        })
      )
      .subscribe();
  }

  buildForm(workout: Workout) {
    this.form.get('reps').setValue(workout.reps ?? 1);
    this.form.get('amrap').setValue(workout.amrap ?? false);
    this.form.get('sets').setValue(workout.sets ?? 1);
    this.form.get('leftRight').setValue(workout.exercise.leftRight ?? false);
    this.form.get('weight').setValue(workout.weight ?? 0);
    this.form.get('intensity').setValue(workout.intensity ?? '');
    this.form.get('tempo').setValue(workout.tempo ?? '');
    this.leftRight = workout.exercise.leftRight;
  }

  disableInputs() {
    this.form.disable();
  }

  enableInputs() {
    this.form.enable();
  }

  openExerciseDialog() {
    const dialogRef = this.dialog.open(ExerciseDialog, {
      width: '500px',
      data: this.workout.exercise,
    });

    dialogRef.afterClosed().subscribe((result?: Exercise) => {
      if (result) {
        this.updateExercise.emit(result);
        this.workout = {
          ...this.workout,
          exercise: {
            ...result,
          },
        };
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
