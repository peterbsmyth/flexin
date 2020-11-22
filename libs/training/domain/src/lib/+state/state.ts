import {
  WorkoutsState,
  WORKOUTS_FEATURE_KEY,
} from './workouts/workouts.reducer';
import {
  CategoriesState,
  CATEGORIES_FEATURE_KEY,
} from './categories/categories.reducer';
import {
  V2EXERCISES_FEATURE_KEY,
  V2ExercisesState,
} from './v2-exercises/v2-exercises.reducer';
import {
  V2PROGRAMS_FEATURE_KEY,
  V2ProgramsState,
} from './v2-programs/v2-programs.reducer';
import {
  V2SETSTATISTICS_FEATURE_KEY,
  V2SetStatisticsState,
} from './v2-set-statistics/v2-set-statistics.reducer';
import { FoodsState, FOODS_FEATURE_KEY } from './foods/foods.reducer';
import { MealsState, MEALS_FEATURE_KEY } from './meals/meals.reducer';
import {
  MealPlansState,
  MEALPLANS_FEATURE_KEY,
} from './meal-plans/meal-plans.reducer';

export interface State {
  readonly [WORKOUTS_FEATURE_KEY]: WorkoutsState;
  readonly [CATEGORIES_FEATURE_KEY]: CategoriesState;
  readonly [V2EXERCISES_FEATURE_KEY]: V2ExercisesState;
  readonly [V2PROGRAMS_FEATURE_KEY]: V2ProgramsState;
  readonly [V2SETSTATISTICS_FEATURE_KEY]: V2SetStatisticsState;
  readonly [FOODS_FEATURE_KEY]: FoodsState;
  readonly [MEALS_FEATURE_KEY]: MealsState;
  readonly [MEALPLANS_FEATURE_KEY]: MealPlansState;
}

export interface TrainingState {
  training: State;
}
