import { createAction, props } from '@ngrx/store';
import { Exercise } from '@bod/shared/models';

export const loadExercises = createAction('[Exercises] Load Exercises');

export const loadExercisesSuccess = createAction(
  '[Exercises] Load Exercises Success',
  props<{ exercises: Exercise[] }>()
);

export const loadExercisesFailure = createAction(
  '[Exercises] Load Exercises Failure',
  props<{ error: any }>()
);
