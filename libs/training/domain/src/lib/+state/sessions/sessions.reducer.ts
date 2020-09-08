import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { SessionsPageActions, SessionsApiActions } from './actions';
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
    SessionsPageActions.loadSession,
    SessionsPageActions.loadSessions, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SessionsPageActions.loadSessionsSuccess, (state, { sessions }) =>
    sessionsAdapter.setAll(sessions, { ...state, loaded: true })
  ),
  on(SessionsPageActions.loadSessionsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SessionsPageActions.selectSession, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(
    SessionsPageActions.loadSessionSuccess,
    (state, { session }) =>
      sessionsAdapter.setOne(session, {
        ...state,
        loaded: true,
        selectedId: session.id,
      })
  ),
  on(SessionsApiActions.loadSessionSuccess, (state, { session }) =>
    sessionsAdapter.setOne(session, { ...state, loaded: true })
  )
);

export function reducer(state: SessionsState | undefined, action: Action) {
  return sessionsReducer(state, action);
}
