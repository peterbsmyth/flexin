import { ExerciseV2 } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadV2Exercises = createAction('[V2Exercises] Load V2Exercises');

export const loadV2ExercisesSuccess = createAction(
  '[V2Exercises] Load V2Exercises Success',
  props<{ v2Exercises: ExerciseV2[] }>()
);

export const loadV2ExercisesFailure = createAction(
  '[V2Exercises] Load V2Exercises Failure',
  props<{ error: any }>()
);

export const updateExercise = createAction(
  '[Exercises] Update Exercise',
  props<{ exercise: ExerciseV2 }>()
);

export const updateExerciseSuccess = createAction(
  '[Exercises] Update Exercise Success'
);

export const updateExerciseFailure = createAction(
  '[Exercises] Update Exercise Failure',
  props<{ error: any }>()
);
