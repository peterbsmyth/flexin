import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Workout } from '@bod/shared/models';
import { OnChange } from '@bod/shared/utils';
import { WorkoutFormData } from '@bod/training/domain';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'training-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
})
export class WorkoutFormComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  private editingSubject = new BehaviorSubject(false);
  editing$ = this.editingSubject.asObservable();
  private exerciseIdSubject = new BehaviorSubject(null);
  exerciseId$ = this.exerciseIdSubject.asObservable();
  private exercisesSubject = new BehaviorSubject(null);
  exercises$ = this.exercisesSubject.asObservable();
  selectedExercise$ = combineLatest([this.exerciseId$, this.exercises$]).pipe(
    map(([id, exercises]) => (id ? exercises.find((e) => e.id === id) : {}))
  );

  @OnChange<WorkoutFormData>(function (data) {
    this.form = this.buildForm(data);
    this.exerciseForm = this.buildExerciseForm(data);
    this.exerciseIdSubject.next(data.workout.exerciseId);
    this.exercisesSubject.next(data.exercises);
  })
  @Input()
  data: WorkoutFormData;
  @Output() save: EventEmitter<Partial<Workout>> = new EventEmitter();
  @Output() savePlus: EventEmitter<Partial<Workout>> = new EventEmitter();
  @Output() saveExercise: EventEmitter<Partial<Workout>> = new EventEmitter();
  form: FormGroup = this.fb.group({
    reps: 1,
    amrap: false,
    sets: 0,
    weight: 0,
    weightUnit: 'lbs',
    intensityId: this.fb.control('', Validators.required),
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
      setCount: this.fb.control(data.workout.setCount),
      weight: this.fb.control(data.workout.weight),
      weightUnit: 'lbs',
      intensityId: this.fb.control(
        data.workout.intensityId,
        Validators.required
      ),
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
      sets: undefined,
    });
  }
  onSubmitPlus(form) {
    this.savePlus.emit({
      ...this.data.workout,
      ...form,
      sets: undefined,
    });
  }

  onSaveExercise(value) {
    this.saveExercise.emit({
      exerciseId: value.id,
      id: this.data.workout.id,
    });
    this.exerciseIdSubject.next(value.id);
    this.editingSubject.next(false);
    this.form.enable();
  }

  onEditExercise() {
    this.exerciseForm = this.buildExerciseForm(this.data);
    this.editingSubject.next(true);
    this.form.disable();
  }

  onCancelExercise() {
    this.editingSubject.next(false);
    this.form.enable();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
