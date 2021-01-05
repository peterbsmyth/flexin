import { ActionReducerMap } from '@ngrx/store';
import {
  CATEGORIES_FEATURE_KEY,
  reducer as categoriesReducer
} from './categories/categories.reducer';
import {
  EXERCISES_FEATURE_KEY,
  reducer as exercisesReducer
} from './exercises/exercises.reducer';
import {
  PROGRAMS_FEATURE_KEY,
  reducer as programsReducer
} from './programs/programs.reducer';
import {
  reducer as setStatisticsReducer,
  SETSTATISTICS_FEATURE_KEY
} from './set-statistics/set-statistics.reducer';
import { State } from './state';
import {
  reducer as workoutsReducer,
  WORKOUTS_FEATURE_KEY
} from './workouts/workouts.reducer';

export const totalReducer: ActionReducerMap<State> = {
  [WORKOUTS_FEATURE_KEY]: workoutsReducer,
  [CATEGORIES_FEATURE_KEY]: categoriesReducer,
  [EXERCISES_FEATURE_KEY]: exercisesReducer,
  [PROGRAMS_FEATURE_KEY]: programsReducer,
  [SETSTATISTICS_FEATURE_KEY]: setStatisticsReducer,
};
