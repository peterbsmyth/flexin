import { createAction, props } from '@ngrx/store';
import { Exercise } from '@bod/models';

export const loadExercises = createAction('[Exercises] Load Exercises');

export const loadExercisesSuccess = createAction(
  '[Exercises] Load Exercises Success',
  props<{ exercises: Exercise[] }>()
);

export const loadExercisesFailure = createAction(
  '[Exercises] Load Exercises Failure',
  props<{ error: any }>()
);


export const saveExercise = createAction(
  '[Exercises] Save Exercise',
  props<{ exercise: Exercise }>()
);

export const saveExerciseSuccess = createAction(
  '[Exercises] Save Exercise Success',
  props<{ exercise: Exercise }>()
);

export const saveExerciseFailure = createAction(
  '[Exercises] Save Exercise Failure',
  props<{ error: any }>()
);
