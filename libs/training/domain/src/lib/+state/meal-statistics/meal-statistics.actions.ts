import { MealStatistic } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadMealStatistics = createAction(
  '[MealStatistics] Load MealStatistics'
);

export const loadMealStatisticsSuccess = createAction(
  '[MealStatistics] Load MealStatistics Success',
  props<{ mealStatistics: MealStatistic[] }>()
);

export const loadMealStatisticsFailure = createAction(
  '[MealStatistics] Load MealStatistics Failure',
  props<{ error: any }>()
);
