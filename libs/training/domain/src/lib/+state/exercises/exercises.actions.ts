import { Category, Exercise, Intensity } from '@bod/shared/models';
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

export const saveExerciseCategory = createAction(
  '[Exercises] Save Category',
  props<{ exercise: Exercise; category: Partial<Category> }>()
);

export const saveExerciseCategorySuccess = createAction(
  '[Exercises] Save Category Success',
  props<{ exercise: Exercise; category: Category }>()
);

export const deleteExerciseCategory = createAction(
  '[Exercises] Delete Category',
  props<{ exercise: Exercise; categoryId: number }>()
);

export const deleteExerciseCategorySuccess = createAction(
  '[Exercises] Delete Category Success'
);

export const saveIntensity = createAction(
  '[Exercises] Save Intensity',
  props<{ exercise: Exercise; intensity: Partial<Intensity> }>()
);

export const saveIntensitySuccess = createAction(
  '[Exercises] Save Intensity Success',
  props<{ exercise: Exercise; intensity: Intensity }>()
);

export const deleteIntensity = createAction(
  '[Exercises] Delete Intensity',
  props<{ exercise: Exercise; intensityId: number }>()
);

export const deleteIntensitySuccess = createAction(
  '[Exercises] Delete Intensity Success'
);
