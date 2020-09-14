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

export const selectExercise = createAction(
  '[Exercises] Select Exercise',
  props<{ id: number }>()
);
