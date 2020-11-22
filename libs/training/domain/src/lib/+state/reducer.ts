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
  V2EXERCISES_FEATURE_KEY,
  reducer as v2ExercisesReducer,
} from './v2-exercises/v2-exercises.reducer';
import {
  V2PROGRAMS_FEATURE_KEY,
  reducer as v2ProgramsReducer,
} from './v2-programs/v2-programs.reducer';
import {
  V2SETSTATISTICS_FEATURE_KEY,
  reducer as v2setStatisticsReducer,
} from './v2-set-statistics/v2-set-statistics.reducer';
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
  [V2EXERCISES_FEATURE_KEY]: v2ExercisesReducer,
  [V2PROGRAMS_FEATURE_KEY]: v2ProgramsReducer,
  [V2SETSTATISTICS_FEATURE_KEY]: v2setStatisticsReducer,
  [FOODS_FEATURE_KEY]: foodsReducer,
  [MEALS_FEATURE_KEY]: mealsReducer,
  [MEALPLANS_FEATURE_KEY]: mealPlansReducer,
};
