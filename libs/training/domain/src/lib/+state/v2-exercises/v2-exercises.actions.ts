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
