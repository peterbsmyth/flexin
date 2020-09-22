import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { SessionStatisticsActions } from './actions';
import { SessionStatistic } from '@bod/shared/models';

export const SESSIONSTATISTICS_FEATURE_KEY = 'sessionStatistics';

export interface SessionStatisticsState extends EntityState<SessionStatistic> {
  selectedId?: string | number; // which SessionStatistics record has been selected
  loaded: boolean; // has the SessionStatistics list been loaded
  error?: string | null; // last known error (if any)
}

export const sessionStatisticsAdapter: EntityAdapter<SessionStatistic> = createEntityAdapter<
  SessionStatistic
>();

export const initialState: SessionStatisticsState = sessionStatisticsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const sessionStatisticsReducer = createReducer(
  initialState,
  on(SessionStatisticsActions.loadSessionStatistics, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    SessionStatisticsActions.loadSessionStatisticsSuccess,
    (state, { sessionStatistics }) =>
      sessionStatisticsAdapter.setAll(sessionStatistics, {
        ...state,
        loaded: true,
      })
  ),
  on(
    SessionStatisticsActions.loadSessionStatisticBySessionSuccess,
    SessionStatisticsActions.saveSessionStatisticBySessionSuccess,
    (state, { sessionStatistic }) =>
      sessionStatisticsAdapter.upsertOne(sessionStatistic, {
        ...state,
        loaded: true,
      })
  ),
  on(
    SessionStatisticsActions.loadSessionStatisticsFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function reducer(state: SessionStatisticsState | undefined, action: Action) {
  return sessionStatisticsReducer(state, action);
}
