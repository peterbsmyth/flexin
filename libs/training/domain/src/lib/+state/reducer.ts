import { ActionReducerMap } from '@ngrx/store';
import {
  PROGRAMS_FEATURE_KEY,
  reducer as programsReducer,
} from './programs/programs.reducer';
import {
  SESSIONITEMS_FEATURE_KEY,
  reducer as sessionItemsReducer,
} from './session-items/session-items.reducer';
import {
  SESSIONITEMSTATISTICS_FEATURE_KEY,
  reducer as sessionItemStatisticsReducer,
} from './session-item-statistics/session-item-statistics.reducer';
import {
  SETSTATISTICS_FEATURE_KEY,
  reducer as setStatisticsReducer,
} from './set-statistics/set-statistics.reducer';
import {
  SESSIONS_FEATURE_KEY,
  reducer as sessionsReducer,
} from './sessions/sessions.reducer';
import {
  SESSIONSTATISTICS_FEATURE_KEY,
  reducer as sessionStatisticsReducer,
} from './session-statistics/session-statistics.reducer';
import {
  WEEKS_FEATURE_KEY,
  reducer as weeksReducer,
} from './weeks/weeks.reducer';
import {
  EXERCISES_FEATURE_KEY,
  reducer as exercisesReducer,
} from './exercises/exercises.reducer';
import {
  reducer as weekStatisticsReducer,
  WEEKSTATISTICS_FEATURE_KEY,
} from './week-statistics/week-statistics.reducer';
import {
  reducer as programStatisticsReducer,
  PROGRAMSTATISTICS_FEATURE_KEY,
} from './program-statistics/program-statistics.reducer';
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
  [EXERCISES_FEATURE_KEY]: exercisesReducer,
  [PROGRAMSTATISTICS_FEATURE_KEY]: programStatisticsReducer,
  [PROGRAMS_FEATURE_KEY]: programsReducer,
  [SESSIONITEMS_FEATURE_KEY]: sessionItemsReducer,
  [SESSIONITEMSTATISTICS_FEATURE_KEY]: sessionItemStatisticsReducer,
  [SESSIONS_FEATURE_KEY]: sessionsReducer,
  [SESSIONSTATISTICS_FEATURE_KEY]: sessionStatisticsReducer,
  [SETSTATISTICS_FEATURE_KEY]: setStatisticsReducer,
  [WEEKSTATISTICS_FEATURE_KEY]: weekStatisticsReducer,
  [WEEKS_FEATURE_KEY]: weeksReducer,
  [WORKOUTS_FEATURE_KEY]: workoutsReducer,
  [CATEGORIES_FEATURE_KEY]: categoriesReducer,
  [V2EXERCISES_FEATURE_KEY]: v2ExercisesReducer,
  [V2PROGRAMS_FEATURE_KEY]: v2ProgramsReducer,
  [V2SETSTATISTICS_FEATURE_KEY]: v2setStatisticsReducer,
  [FOODS_FEATURE_KEY]: foodsReducer,
  [MEALS_FEATURE_KEY]: mealsReducer,
  [MEALPLANS_FEATURE_KEY]: mealPlansReducer,
};
