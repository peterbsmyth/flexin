import { ActionReducerMap } from '@ngrx/store';
import {
  reducer as workoutsReducer,
  WORKOUTS_FEATURE_KEY,
} from './workouts/workouts.reducer';
import {
  reducer as categoriesReducer,
  CATEGORIES_FEATURE_KEY,
} from './categories/categories.reducer';
import {
  EXERCISES_FEATURE_KEY,
  reducer as exercisesReducer,
} from './exercises/exercises.reducer';
import {
  PROGRAMS_FEATURE_KEY,
  reducer as programsReducer,
} from './programs/programs.reducer';
import {
  SETSTATISTICS_FEATURE_KEY,
  reducer as setStatisticsReducer,
} from './set-statistics/set-statistics.reducer';
import {
  reducer as foodsReducer,
  FOODS_FEATURE_KEY,
} from './foods/foods.reducer';
import {
  reducer as mealsReducer,
  MEALS_FEATURE_KEY,
} from './meals/meals.reducer';
import {
  reducer as mealPlansReducer,
  MEALPLANS_FEATURE_KEY,
} from './meal-plans/meal-plans.reducer';
import { State } from './state';

export const totalReducer: ActionReducerMap<State> = {
  [WORKOUTS_FEATURE_KEY]: workoutsReducer,
  [CATEGORIES_FEATURE_KEY]: categoriesReducer,
  [EXERCISES_FEATURE_KEY]: exercisesReducer,
  [PROGRAMS_FEATURE_KEY]: programsReducer,
  [SETSTATISTICS_FEATURE_KEY]: setStatisticsReducer,
  [FOODS_FEATURE_KEY]: foodsReducer,
  [MEALS_FEATURE_KEY]: mealsReducer,
  [MEALPLANS_FEATURE_KEY]: mealPlansReducer,
};
