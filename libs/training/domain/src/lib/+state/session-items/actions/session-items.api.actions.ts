import { createAction, props } from '@ngrx/store';
import { SessionItem } from '@bod/shared/domain';

export const loadSessionItems = createAction(
  '[SessionItems API] Load SessionItems'
);

export const loadSessionItemsSuccess = createAction(
  '[SessionItems API] Load SessionItems Success',
  props<{ sessionItems: SessionItem[] }>()
);

export const loadSessionItemsFailure = createAction(
  '[SessionItems API] Load SessionItems Failure',
  props<{ error: any }>()
);

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
