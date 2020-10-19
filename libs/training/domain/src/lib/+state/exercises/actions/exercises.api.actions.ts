import { createAction, props } from '@ngrx/store';
import { Exercise } from '@bod/shared/models';

export const loadExercise = createAction(
  '[Exercises] Load Exercise',
  props<{ id: number }>()
);

export const loadExerciseFromGuard = createAction(
  '[Exercises - Guard] Load Exercise',
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

export const loadExercises = createAction('[Exercises] Load Exercises');

export const loadExercisesFromSessionItemPage = createAction(
  '[Exercises - Session Item Page] Load Exercises'
);

export const loadExercisesFromProgramBoardPage = createAction(
  '[Exercises - Program Board Page] Load Exercises'
);

export const loadExercisesFromPage = createAction(
  '[Exercises - Page] Load Exercises'
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

export const selectExerciseFromGuard = createAction(
  '[Exercises - Guard] Select Exercise',
  props<{ id: number }>()
);

export const updateExerciseFromPage = createAction(
  '[Exercises - Page] Update Exercise',
  props<{ exercise: Exercise }>()
);

export const updateExerciseFromSessionPage = createAction(
  '[Exercises - Session Page] Update Exercise',
  props<{ exercise: Exercise }>()
);

export const updateExerciseSuccess = createAction(
  '[Exercises] Update Exercise Success'
);

export const updateExerciseFailure = createAction(
  '[Exercises] Update Exercise Failure',
  props<{ error: any }>()
);

export const saveExerciseFromPage = createAction(
  '[Exercises - Page] Save Exercise',
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
