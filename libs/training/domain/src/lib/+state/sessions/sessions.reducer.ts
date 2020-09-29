import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { SessionsActions } from './actions';
import { Session } from '@bod/shared/models';

export const SESSIONS_FEATURE_KEY = 'sessions';

export interface SessionsState extends EntityState<Session> {
  selectedId?: string | number; // which Sessions record has been selected
  loaded: boolean; // has the Sessions list been loaded
  error?: string | null; // last known error (if any)
}

export const sessionsAdapter: EntityAdapter<Session> = createEntityAdapter<
  Session
>();

export const initialState: SessionsState = sessionsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

export const sessionsReducer = createReducer(
  initialState,
  on(
    SessionsActions.loadSession,
    SessionsActions.loadSessionWithAscendants,
    SessionsActions.loadSessionsByWeek, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SessionsActions.loadSessionsByWeekSuccess, (state, { sessions }) =>
    sessionsAdapter.upsertMany(sessions, { ...state, loaded: true })
  ),
  on(SessionsActions.loadSessionsByWeekFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SessionsActions.selectSession, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(
    SessionsActions.loadSessionSuccess,
    (state, { session }) =>
      sessionsAdapter.setOne(session, {
        ...state,
        loaded: true,
        selectedId: session.id,
      })
  ),
  on(
    SessionsActions.loadSessionSync,
    (state, { session }) =>
      sessionsAdapter.setOne(session, {
        ...state,
        selectedId: session.id,
      })
  ),
  on(
    SessionsActions.loadSessionWithAscendantsSuccess,
    (state) => ({
      ...state,
      loaded: true
    })
  )
);

export function reducer(state: SessionsState | undefined, action: Action) {
  return sessionsReducer(state, action);
}
