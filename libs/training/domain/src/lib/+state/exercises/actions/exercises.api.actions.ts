import { createAction, props } from '@ngrx/store';
import { Exercise } from '@bod/shared/models';

export const loadExerciseFromInputFeatureSessionItemPage = createAction(
  '[Exercises][Input Workout][Session Item Page] Load Exercise',
  props<{ id: number }>()
);

export const loadExerciseFromGuard = createAction(
  '[Exercises][Create Program][Guard] Load Exercise',
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
  '[Exercises][Create Program][Session Item Page] Load Exercises'
);

export const loadExercisesFromProgramBoardPage = createAction(
  '[Exercises][Create Program][Program Board Page] Load Exercises'
);

export const loadExercisesFromPage = createAction(
  '[Exercises][Create Program][Page] Load Exercises'
);

export const loadExercisesSuccess = createAction(
  '[Exercises] Load Exercises Success',
  props<{ exercises: Exercise[] }>()
);

export const loadExercisesFailure = createAction(
  '[Exercises] Load Exercises Failure',
  props<{ error: any }>()
);

export const selectExerciseFromInputFeatureExercisePage = createAction(
  '[Exercises][Input Workout][Exercise Page] Select Exercise',
  props<{ id: number }>()
);

export const selectExerciseFromInputFeatureSessionItemPage = createAction(
  '[Exercises][Input Workout][Session Item Page] Select Exercise',
  props<{ id: number }>()
);

export const selectExerciseFromGuard = createAction(
  '[Exercises][Create Program][Guard] Select Exercise',
  props<{ id: number }>()
);

export const updateExerciseFromPage = createAction(
  '[Exercises][Create Program][Page] Update Exercise',
  props<{ exercise: Exercise }>()
);

export const updateExerciseFromSessionPage = createAction(
  '[Exercises][Create Program][Session Page] Update Exercise',
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
  '[Exercises][Create Program][Page] Save Exercise',
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
