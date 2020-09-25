import { createAction, props } from '@ngrx/store';
import { Exercise } from '@bod/shared/models';

export const loadExercise = createAction(
  '[Exercises] Load Exercise',
  props<{ id: number }>()
);

export const loadExerciseSuccess = createAction(
  '[Exercises] Load Exercise Success',
  props<{ exercise: Exercise }>()
);

export const loadExerciseFailure = createAction(
  '[Exercises] Load Exercise Failure',
  props<{ error: any }>()
);

export const loadExercises = createAction(
  '[Exercises] Load Exercises'
);

export const loadExercisesSuccess = createAction(
  '[Exercises] Load Exercises Success',
  props<{ exercises: Exercise[] }>()
);

export const loadExercisesFailure = createAction(
  '[Exercises] Load Exercises Failure',
  props<{ error: any }>()
);

export const selectExercise = createAction(
  '[Exercises] Select Exercise',
  props<{ id: number }>()
);
