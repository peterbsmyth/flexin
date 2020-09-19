import { createAction, props } from '@ngrx/store';
import { SessionItem } from '@bod/shared/models';

export const loadSessionItemsBySession = createAction(
  '[SessionItems Page] Load SessionItem By Session',
  props<{ id: number }>()
);

export const loadSessionItemsBySessionSuccess = createAction(
  '[SessionItems Page] Load SessionItem By Session Success',
  props<{ sessionItems: SessionItem[] }>()
);

export const loadSessionItemsBySessionFailure = createAction(
  '[SessionItems Page] Load SessionItem By Session Failure',
  props<{ error: any }>()
);

export const loadSessionItem = createAction(
  '[SessionItems Page] Load SessionItem',
  props<{ id: number }>()
);

export const loadSessionItemSuccess = createAction(
  '[SessionItems Page] Load SessionItem Success',
  props<{ sessionItem: SessionItem }>()
);

export const loadSessionItemFailure = createAction(
  '[SessionItems Page] Load SessionItem Failure',
  props<{ error: any }>()
);

export const loadSessionItemWithExercise = createAction(
  '[SessionItems Page] Load SessionItem With Exercise',
  props<{ id: number }>()
);

export const loadSessionItemWithExerciseSuccess = createAction(
  '[SessionItems Page] Load SessionItem With Exercise Success',
  props<{ sessionItem: SessionItem }>()
);

export const loadSessionItemWithExerciseFailure = createAction(
  '[SessionItems Page] Load SessionItem With Exercise Failure',
  props<{ error: any }>()
);


export const selectSessionItem = createAction(
  '[SessionItems Page] Select SessionItem',
  props<{ id: number }>()
);

export const updateSessionItem = createAction(
  '[SessionItems Page] Update SessionItem',
  props<{ sessionItem: SessionItem }>()
);

export const updateSessionItemSuccess = createAction(
  '[SessionItems Page] Update SessionItem Success'
);

export const updateSessionItemFailure = createAction(
  '[SessionItems Page] Update SessionItem Failure',
  props<{ error: any }>()
);
