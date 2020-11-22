import {
  PROGRAMS_FEATURE_KEY,
  ProgramsState,
} from './programs/programs.reducer';
import {
  SESSIONITEMS_FEATURE_KEY,
  SessionItemsState,
} from './session-items/session-items.reducer';
import {
  SESSIONITEMSTATISTICS_FEATURE_KEY,
  SessionItemStatisticsState,
} from './session-item-statistics/session-item-statistics.reducer';
import {
  SETSTATISTICS_FEATURE_KEY,
  SetStatisticsState,
} from './set-statistics/set-statistics.reducer';
import {
  SESSIONS_FEATURE_KEY,
  SessionsState,
} from './sessions/sessions.reducer';
import {
  SESSIONSTATISTICS_FEATURE_KEY,
  SessionStatisticsState,
} from './session-statistics/session-statistics.reducer';
import { WEEKS_FEATURE_KEY, WeeksState } from './weeks/weeks.reducer';
import {
  EXERCISES_FEATURE_KEY,
  ExercisesState,
} from './exercises/exercises.reducer';
import {
  WeekStatisticsState,
  WEEKSTATISTICS_FEATURE_KEY,
} from './week-statistics/week-statistics.reducer';
import {
  ProgramStatisticsState,
  PROGRAMSTATISTICS_FEATURE_KEY,
} from './program-statistics/program-statistics.reducer';
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
  readonly [EXERCISES_FEATURE_KEY]: ExercisesState;
  readonly [PROGRAMSTATISTICS_FEATURE_KEY]: ProgramStatisticsState;
  readonly [PROGRAMS_FEATURE_KEY]: ProgramsState;
  readonly [SESSIONITEMS_FEATURE_KEY]: SessionItemsState;
  readonly [SESSIONITEMSTATISTICS_FEATURE_KEY]: SessionItemStatisticsState;
  readonly [SESSIONS_FEATURE_KEY]: SessionsState;
  readonly [SESSIONSTATISTICS_FEATURE_KEY]: SessionStatisticsState;
  readonly [SETSTATISTICS_FEATURE_KEY]: SetStatisticsState;
  readonly [WEEKSTATISTICS_FEATURE_KEY]: WeekStatisticsState;
  readonly [WEEKS_FEATURE_KEY]: WeeksState;
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
