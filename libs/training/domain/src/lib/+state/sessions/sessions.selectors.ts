import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SESSIONS_FEATURE_KEY,
  SessionsState,
  sessionsAdapter,
} from './sessions.reducer';
import { PartialState } from '../root.reducer';

// Lookup the 'Sessions' feature state managed by NgRx
export const getSessionsState = createFeatureSelector<
  PartialState,
  SessionsState
>(SESSIONS_FEATURE_KEY);

const { selectAll, selectEntities } = sessionsAdapter.getSelectors();

export const getSessionsLoaded = createSelector(
  getSessionsState,
  (state: SessionsState) => state.loaded
);

export const getSessionsError = createSelector(
  getSessionsState,
  (state: SessionsState) => state.error
);

export const getAllSessions = createSelector(getSessionsState, (state: SessionsState) =>
  selectAll(state)
);

export const getSessionsEntities = createSelector(
  getSessionsState,
  (state: SessionsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSessionsState,
  (state: SessionsState) => state.selectedId
);

export const getSelected = createSelector(
  getSessionsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
