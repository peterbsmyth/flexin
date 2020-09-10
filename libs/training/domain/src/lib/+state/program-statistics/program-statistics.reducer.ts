import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ProgramStatisticsActions } from './actions';
import { ProgramStatistic } from '@bod/shared/models';

export const PROGRAMSTATISTICS_FEATURE_KEY = 'programStatistics';

export interface ProgramStatisticsState extends EntityState<ProgramStatistic> {
  selectedId?: string | number; // which ProgramStatistics record has been selected
  loaded: boolean; // has the ProgramStatistics list been loaded
  error?: string | null; // last known error (if any)
}

export const programStatisticsAdapter: EntityAdapter<ProgramStatistic> = createEntityAdapter<
  ProgramStatistic
>();

export const initialState: ProgramStatisticsState = programStatisticsAdapter.getInitialState(
  {
    // program initial required properties
    loaded: false,
  }
);

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
      programStatisticsAdapter.setAll(programStatistics, {
        ...state,
        loaded: true,
      })
  ),
  on(
    ProgramStatisticsActions.saveProgramStatisticSuccess,
    ProgramStatisticsActions.updateProgramStatistic,
    (state, { programStatistic }) =>
      programStatisticsAdapter.upsertOne(programStatistic, {
        ...state,
        loaded: true,
      })
  ),
  on(
    ProgramStatisticsActions.loadProgramStatisticsFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function reducer(state: ProgramStatisticsState | undefined, action: Action) {
  return programStatisticsReducer(state, action);
}
