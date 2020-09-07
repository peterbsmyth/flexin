import { createAction, props } from '@ngrx/store';
import { SessionItemsEntity } from './session-items.models';

export const loadSessionItems = createAction(
  '[SessionItems] Load SessionItems'
);

export const loadSessionItemsSuccess = createAction(
  '[SessionItems] Load SessionItems Success',
  props<{ sessionItems: SessionItemsEntity[] }>()
);

export const loadSessionItemsFailure = createAction(
  '[SessionItems] Load SessionItems Failure',
  props<{ error: any }>()
);
