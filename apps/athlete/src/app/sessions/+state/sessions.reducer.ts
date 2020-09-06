import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SessionsActions from './sessions.actions';
import { Session } from '@bod/models';

export const SESSIONS_FEATURE_KEY = 'sessions';

export interface State extends EntityState<Session> {
  selectedId?: string | number; // which Sessions record has been selected
  loaded: boolean; // has the Sessions list been loaded
  error?: string | null; // last known error (if any)
}

export interface SessionsPartialState {
  readonly [SESSIONS_FEATURE_KEY]: State;
}

export const sessionsAdapter: EntityAdapter<Session> = createEntityAdapter<
  Session
>();

export const initialState: State = sessionsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const sessionsReducer = createReducer(
  initialState,
  on(SessionsActions.loadSessions, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SessionsActions.loadSessionsSuccess, (state, { sessions }) =>
    sessionsAdapter.setAll(sessions, { ...state, loaded: true })
  ),
  on(SessionsActions.loadSessionsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SessionsActions.selectSession, (state, { id }) => ({ ...state, selectedId: id })),
  on(SessionsActions.loadSessionPageSuccess, (state, { session }) => sessionsAdapter.setOne(session, { ...state, loaded: true, selectedId: session.id })),
  on(SessionsActions.loadSessionSuccess, (state, { session }) => sessionsAdapter.setOne(session, { ...state, loaded: true })),
);

export function reducer(state: State | undefined, action: Action) {
  return sessionsReducer(state, action);
}
