import { createAction, props } from '@ngrx/store';
import { SessionItem } from '@bod/shared/models';

export const loadSessionItemsBySession = createAction(
  '[SessionItems] Load SessionItem By Session',
  props<{ id: number }>()
);

export const loadSessionItemsBySessionSuccess = createAction(
  '[SessionItems] Load SessionItem By Session Success',
  props<{ sessionItems: SessionItem[] }>()
);

export const loadSessionItemsBySessionFailure = createAction(
  '[SessionItems] Load SessionItem By Session Failure',
  props<{ error: any }>()
);

export const loadSessionItems = createAction(
  '[SessionItems] Load SessionItems',
  props<{ id: number }>()
);

export const loadSessionItemsSuccess = createAction(
  '[SessionItems] Load SessionItems Success',
  props<{ sessionItems: SessionItem[] }>()
);

export const loadSessionItemsFailure = createAction(
  '[SessionItems] Load SessionItems Failure',
  props<{ error: any }>()
);

export const loadSessionItem = createAction(
  '[SessionItems] Load SessionItem',
  props<{ id: number }>()
);

export const loadSessionItemSuccess = createAction(
  '[SessionItems] Load SessionItem Success',
  props<{ sessionItem: SessionItem }>()
);

export const loadSessionItemFailure = createAction(
  '[SessionItems] Load SessionItem Failure',
  props<{ error: any }>()
);

export const selectSessionItem = createAction(
  '[SessionItems] Select SessionItem',
  props<{ id: number }>()
);

export const selectSessionItemFromGuard = createAction(
  '[SessionItems][Guard] Select SessionItem',
  props<{ id: number }>()
);

export const updateSessionItemFromCreateProgramSessionItemPage = createAction(
  '[SessionItems][Create Program][Session Item Page] Update SessionItem',
  props<{ sessionItem: SessionItem }>()
);

export const updateSessionItemSuccess = createAction(
  '[SessionItems] Update SessionItem Success'
);

export const updateSessionItemFailure = createAction(
  '[SessionItems] Update SessionItem Failure',
  props<{ error: any }>()
);

export const loadSessionItemFromGuard = createAction(
  '[SessionItems][Guard] Load SessionItem',
  props<{ id: number }>()
);
