import { Food } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadFoods = createAction('[Foods] Load Foods');

export const loadFoodsSuccess = createAction(
  '[Foods] Load Foods Success',
  props<{ foods: Food[] }>()
);

export const loadFoodsFailure = createAction(
  '[Foods] Load Foods Failure',
  props<{ error: any }>()
);
