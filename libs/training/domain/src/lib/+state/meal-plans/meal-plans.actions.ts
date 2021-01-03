import { MealPlan } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadMealPlans = createAction('[MealPlans] Load MealPlans');

export const loadMealPlansSuccess = createAction(
  '[MealPlans] Load MealPlans Success',
  props<{ mealPlans: MealPlan[] }>()
);

export const loadMealPlansFailure = createAction(
  '[MealPlans] Load MealPlans Failure',
  props<{ error: string }>()
);
