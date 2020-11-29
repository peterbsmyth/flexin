import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { WorkoutFormData } from '@bod/training/domain';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Workout } from '@bod/shared/models';
import { OnChange } from '@bod/shared/utils';

@Component({
  selector: 'training-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
})
export class WorkoutFormComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  editing = false;

  @OnChange<WorkoutFormData>(function (data) {
    this.form = this.buildForm(data);
    this.exerciseForm = this.buildExerciseForm(data);
  })
  @Input()
  data: WorkoutFormData;

  @Output() save: EventEmitter<Partial<Workout>> = new EventEmitter();
  @Output() savePlus: EventEmitter<Partial<Workout>> = new EventEmitter();
  form: FormGroup = this.fb.group({
    reps: 1,
    amrap: false,
    sets: 0,
    weight: 0,
    weightUnit: 'lbs',
    intensity: this.fb.control('', Validators.required),
    tempo: '',
    order: null,
  });

  exerciseForm: FormGroup = this.fb.group({
    id: '',
  });

  get intensities() {
    return <FormArray>this.form.get('intensities');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  buildForm(data: WorkoutFormData) {
    const form = this.fb.group({
      reps: this.fb.control(data.workout.reps),
      amrap: this.fb.control(data.workout.amrap),
      sets: this.fb.control(data.workout.setCount),
      weight: this.fb.control(data.workout.weight),
      weightUnit: 'lbs',
      intensity: this.fb.control(data.workout.intensityId, Validators.required),
      tempo: this.fb.control(data.workout.tempo),
    });

    if (data.workout.amrap) {
      form.get('reps').setValue(1);
      form.get('reps').disable();
    }

    form
      .get('amrap')
      .valueChanges.pipe(
        takeUntil(this.unsubscribe$),
        tap((amrap) => {
          if (amrap) {
            this.form.get('reps').setValue(0);
            this.form.get('reps').disable();
          } else {
            this.form.get('reps').setValue(this.data.workout.reps);
            this.form.get('reps').enable();
          }
        })
      )
      .subscribe();
    return form;
  }

  buildExerciseForm(data: WorkoutFormData) {
    return this.fb.group({
      id: this.fb.control(data.workout.exerciseId),
    });
  }

  addIntensity() {
    this.intensities.push(
      this.fb.group({
        name: this.fb.control(''),
      })
    );
  }

  onRemoveIntensity(index: number) {
    this.intensities.removeAt(index);
  }

  onSubmit(form) {
    this.save.emit({
      ...form,
      id: this.data.workout.id,
      order: this.data.workout.order,
    });
  }
  onSubmitPlus(form) {
    this.savePlus.emit({
      ...this.data.workout,
      ...form,
    });
  }

  onSaveExercise(value) {
    const defaultIntensity = this.data.exercises.find((e) => e.id === value.id)
      .intensities[0];
    this.save.emit({
      exerciseId: value.id,
      id: this.data.workout.id,
      // intensity: defaultIntensity,
    });
    this.editing = false;
    this.form.enable();
  }

  onEditExercise() {
    this.exerciseForm = this.buildExerciseForm(this.data);
    this.editing = true;
    this.form.disable();
  }

  onCancelExercise() {
    this.editing = false;
    this.form.enable();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
