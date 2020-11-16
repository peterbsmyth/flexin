import { ExerciseV2 } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadV2Exercises = createAction('[V2Exercises] Load V2Exercises');

export const loadExerciseFromGuard = createAction(
  '[V2Exercises][Guard] Load Exercise',
  props<{ id: number }>()
);

export const selectExerciseFromGuard = createAction(
  '[V2Exercises][Guard] Select Exercise',
  props<{ id: number }>()
);

export const loadExerciseSuccess = createAction(
  '[V2Exercises] Load Exercise Success',
  props<{ exercise: ExerciseV2 }>()
);

export const loadExerciseFailure = createAction(
  '[V2Exercises] Load Exercise Failure',
  props<{ error: any }>()
);

export const loadV2ExercisesSuccess = createAction(
  '[V2Exercises] Load V2Exercises Success',
  props<{ v2Exercises: ExerciseV2[] }>()
);

export const loadV2ExercisesFailure = createAction(
  '[V2Exercises] Load V2Exercises Failure',
  props<{ error: any }>()
);

export const updateExercise = createAction(
  '[V2Exercises] Update Exercise',
  props<{ exercise: ExerciseV2 }>()
);

export const updateExerciseSuccess = createAction(
  '[V2Exercises] Update Exercise Success'
);

export const updateExerciseFailure = createAction(
  '[V2Exercises] Update Exercise Failure',
  props<{ error: any }>()
);
