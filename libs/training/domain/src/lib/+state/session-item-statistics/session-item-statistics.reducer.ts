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
      sessionItemStatisticsAdapter.upsertMany(sessionItemStatistics, {
        ...state,
        loaded: true,
      })
  ),
  on(
    SessionItemStatisticsActions.saveSessionItemStatisticSuccess,
    SessionItemStatisticsActions.saveSessionItemStatisticBySessionItemSuccess,
    SessionItemStatisticsActions.updateSessionItemStatistic,
    SessionItemStatisticsActions.loadSessionItemStatisticBySessionItemSuccess,
    (state, { sessionItemStatistic }) =>
      sessionItemStatisticsAdapter.upsertOne(sessionItemStatistic, {
        ...state,
        loaded: true,
        selectedId: sessionItemStatistic.id,
      })
  ),
  on(
    SessionItemStatisticsActions.loadSessionItemStatisticBySessionItemFailure,
    (state) => ({
      ...state,
      loaded: true,
      selectedId: null,
    })
  ),
  on(
    SessionItemStatisticsActions.loadSessionItemStatisticsFailure,
    (state, { error }) => ({ ...state, error })
  ),
  on(
    SessionItemStatisticsActions.selectSessionItemStatistic,
    (state, { id }) => ({ ...state, selectedId: id })
  )
);

export function reducer(
  state: SessionItemStatisticsState | undefined,
  action: Action
) {
  return sessionItemStatisticsReducer(state, action);
}
