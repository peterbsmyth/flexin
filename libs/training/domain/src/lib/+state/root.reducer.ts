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

export interface PartialState {
  readonly [EXERCISES_FEATURE_KEY]: ExercisesState;
  readonly [PROGRAMSTATISTICS_FEATURE_KEY]: ProgramStatisticsState;
  readonly [PROGRAMS_FEATURE_KEY]: ProgramsState;
  readonly [SESSIONITEMS_FEATURE_KEY]: SessionItemsState;
  readonly [SESSIONITEMSTATISTICS_FEATURE_KEY]: SessionItemStatisticsState;
  readonly [SESSIONS_FEATURE_KEY]: SessionStatisticsState;
  readonly [SESSIONSTATISTICS_FEATURE_KEY]: SessionsState;
  readonly [SETSTATISTICS_FEATURE_KEY]: SetStatisticsState;
  readonly [WEEKSTATISTICS_FEATURE_KEY]: WeekStatisticsState;
  readonly [WEEKS_FEATURE_KEY]: WeeksState;
  readonly [WORKOUTS_FEATURE_KEY]: WorkoutsState;
}
