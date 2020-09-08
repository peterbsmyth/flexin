import { EXERCISES_FEATURE_KEY, ExercisesState } from './exercises/exercises.reducer';
import { PROGRAMS_FEATURE_KEY, ProgramsState } from './programs/programs.reducer';
import { SESSIONITEMS_FEATURE_KEY, SessionItemsState } from './session-items/session-items.reducer';
import { SESSIONS_FEATURE_KEY, SessionsState } from './sessions/sessions.reducer';
import { WEEKS_FEATURE_KEY, WeeksState } from './weeks/weeks.reducer';

export interface PartialState {
  readonly [EXERCISES_FEATURE_KEY]: ExercisesState;
  readonly [PROGRAMS_FEATURE_KEY]: ProgramsState;
  readonly [SESSIONITEMS_FEATURE_KEY]: SessionItemsState;
  readonly [SESSIONS_FEATURE_KEY]: SessionsState;
  readonly [WEEKS_FEATURE_KEY]: WeeksState;
}
