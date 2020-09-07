import { createAction, props } from '@ngrx/store';
import { SessionItem } from '@bod/shared/domain';

export const loadSessionItems = createAction(
  '[SessionItems] Load SessionItems'
);

export const loadSessionItemsSuccess = createAction(
  '[SessionItems] Load SessionItems Success',
  props<{ sessionItems: SessionItem[] }>()
);

export const loadSessionItemsFailure = createAction(
  '[SessionItems] Load SessionItems Failure',
  props<{ error: any }>()
);
