import { Exercise } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadExercises = createAction('[Exercises] Load Exercises');

export const loadExerciseFromGuard = createAction(
  '[Exercises][Guard] Load Exercise',
  props<{ id: number }>()
);

export const selectExerciseFromGuard = createAction(
  '[Exercises][Guard] Select Exercise',
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

export const loadExercisesSuccess = createAction(
  '[Exercises] Load Exercises Success',
  props<{ exercises: Exercise[] }>()
);

export const loadExercisesFailure = createAction(
  '[Exercises] Load Exercises Failure',
  props<{ error: any }>()
);

export const updateExercise = createAction(
  '[Exercises] Update Exercise',
  props<{ exercise: Exercise }>()
);

export const updateExerciseSuccess = createAction(
  '[Exercises] Update Exercise Success'
);

export const updateExerciseFailure = createAction(
  '[Exercises] Update Exercise Failure',
  props<{ error: any }>()
);
