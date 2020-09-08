import { createAction, props } from '@ngrx/store';
import { SessionItem } from '@bod/shared/models';

export const loadSessionItem = createAction(
  '[SessionItems API] Load SessionItem',
  props<{ id: number }>()
);

export const loadSessionItemSuccess = createAction(
  '[SessionItems API] Load SessionItem Success',
  props<{ sessionItem: SessionItem }>()
);

export const loadSessionItemFailure = createAction(
  '[SessionItems API] Load SessionItem Failure',
  props<{ error: any }>()
);