import { Meal } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadMeals = createAction('[Meals] Load Meals');

export const loadMealsSuccess = createAction(
  '[Meals] Load Meals Success',
  props<{ meals: Meal[] }>()
);

export const loadMealsFailure = createAction(
  '[Meals] Load Meals Failure',
  props<{ error: any }>()
);
