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
import { WEEKS_FEATURE_KEY, WeeksState } from './weeks/weeks.reducer';
import { EXERCISES_FEATURE_KEY, ExercisesState } from './exercises/exercises.reducer';

export interface PartialState {
  readonly [EXERCISES_FEATURE_KEY]: ExercisesState;
  readonly [PROGRAMS_FEATURE_KEY]: ProgramsState;
  readonly [SESSIONITEMS_FEATURE_KEY]: SessionItemsState;
  readonly [SESSIONITEMSTATISTICS_FEATURE_KEY]: SessionItemStatisticsState;
  readonly [SESSIONS_FEATURE_KEY]: SessionsState;
  readonly [SETSTATISTICS_FEATURE_KEY]: SetStatisticsState;
  readonly [WEEKS_FEATURE_KEY]: WeeksState;
}
