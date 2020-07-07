import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProgramStatisticsActions from './program-statistics.actions';
import { ProgramStatistic } from '@bod/models';

export const PROGRAMSTATISTICS_FEATURE_KEY = 'programStatistics';

export interface State extends EntityState<ProgramStatistic> {
  selectedId?: string | number; // which ProgramStatistics record has been selected
  loaded: boolean; // has the ProgramStatistics list been loaded
  error?: string | null; // last none error (if any)
}

export interface ProgramStatisticsPartialState {
  readonly [PROGRAMSTATISTICS_FEATURE_KEY]: State;
}

export const programStatisticsAdapter: EntityAdapter<ProgramStatistic> = createEntityAdapter<
  ProgramStatistic
>();

export const initialState: State = programStatisticsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const programStatisticsReducer = createReducer(
  initialState,
  on(ProgramStatisticsActions.loadProgramStatistics, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    ProgramStatisticsActions.loadProgramStatisticsSuccess,
    (state, { programStatistics }) =>
      programStatisticsAdapter.addAll(programStatistics, {
        ...state,
        loaded: true,
      })
  ),
  on(
    ProgramStatisticsActions.loadProgramStatisticsFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return programStatisticsReducer(state, action);
}
