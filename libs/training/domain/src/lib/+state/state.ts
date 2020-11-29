import {
  CategoriesState,
  CATEGORIES_FEATURE_KEY,
} from './categories/categories.reducer';
import {
  ExercisesState,
  EXERCISES_FEATURE_KEY,
} from './exercises/exercises.reducer';
import { FoodsState, FOODS_FEATURE_KEY } from './foods/foods.reducer';
import {
  MealPlansState,
  MEALPLANS_FEATURE_KEY,
} from './meal-plans/meal-plans.reducer';
import { MealsState, MEALS_FEATURE_KEY } from './meals/meals.reducer';
import {
  ProgramsState,
  PROGRAMS_FEATURE_KEY,
} from './programs/programs.reducer';
import {
  SetStatisticsState,
  SETSTATISTICS_FEATURE_KEY,
} from './set-statistics/set-statistics.reducer';
import {
  WorkoutsState,
  WORKOUTS_FEATURE_KEY,
} from './workouts/workouts.reducer';

export interface State {
  readonly [WORKOUTS_FEATURE_KEY]: WorkoutsState;
  readonly [CATEGORIES_FEATURE_KEY]: CategoriesState;
  readonly [EXERCISES_FEATURE_KEY]: ExercisesState;
  readonly [PROGRAMS_FEATURE_KEY]: ProgramsState;
  readonly [SETSTATISTICS_FEATURE_KEY]: SetStatisticsState;
  readonly [FOODS_FEATURE_KEY]: FoodsState;
  readonly [MEALS_FEATURE_KEY]: MealsState;
  readonly [MEALPLANS_FEATURE_KEY]: MealPlansState;
}

export interface TrainingState {
  training: State;
}
