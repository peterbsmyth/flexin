import { createAction, props } from '@ngrx/store';
import { SessionItem } from '@bod/shared/models';

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

export const selectSessionItem = createAction(
  '[SessionItems Page] Select SessionItem',
  props<{ id: number }>()
);