import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { SessionItemStatisticsActions } from './actions';
import { SessionItemStatistic } from '@bod/shared/models';

export const SESSIONITEMSTATISTICS_FEATURE_KEY = 'sessionItemStatistics';

export interface SessionItemStatisticsState
  extends EntityState<SessionItemStatistic> {
  selectedId?: string | number; // which SessionItemStatistics record has been selected
  loaded: boolean; // has the SessionItemStatistics list been loaded
  error?: string | null; // last known error (if any)
}

export const sessionItemStatisticsAdapter: EntityAdapter<SessionItemStatistic> = createEntityAdapter<
  SessionItemStatistic
>();

export const initialState: SessionItemStatisticsState = sessionItemStatisticsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const sessionItemStatisticsReducer = createReducer(
  initialState,
  on(
    SessionItemStatisticsActions.loadSessionItemStatistics,
    SessionItemStatisticsActions.saveSessionItemStatistic,
    SessionItemStatisticsActions.updateSessionItemStatistic,
    (state) => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(
    SessionItemStatisticsActions.loadSessionItemStatisticsSuccess,
    (state, { sessionItemStatistics }) =>
      sessionItemStatisticsAdapter.setAll(sessionItemStatistics, {
        ...state,
        loaded: true,
      })
  ),
  on(
    SessionItemStatisticsActions.saveSessionItemStatisticSuccess,
    SessionItemStatisticsActions.updateSessionItemStatistic,
    (state, { sessionItemStatistic }) =>
      sessionItemStatisticsAdapter.upsertOne(sessionItemStatistic, {
        ...state,
        loaded: true,
      })
  ),
  on(
    SessionItemStatisticsActions.loadSessionItemStatisticsFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function reducer(
  state: SessionItemStatisticsState | undefined,
  action: Action
) {
  return sessionItemStatisticsReducer(state, action);
}
