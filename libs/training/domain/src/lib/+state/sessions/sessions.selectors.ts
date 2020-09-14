import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SESSIONS_FEATURE_KEY,
  SessionsState,
  sessionsAdapter,
} from './sessions.reducer';
import { PartialState } from '../root.reducer';
import { getAllSessionItems } from '../session-items/session-items.selectors';
import { Pages, Session } from '@bod/shared/models';

// Lookup the 'Sessions' feature state managed by NgRx
export const getSessionsState = createFeatureSelector<
  PartialState,
  SessionsState
>(SESSIONS_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = sessionsAdapter.getSelectors();

export const getSessionsLoaded = createSelector(
  getSessionsState,
  (state: SessionsState) => state.loaded
);

export const getSessionsError = createSelector(
  getSessionsState,
  (state: SessionsState) => state.error
);

export const getAllSessions = createSelector(
  getSessionsState,
  (state: SessionsState) => selectAll(state)
);

export const getSessionsEntities = createSelector(
  getSessionsState,
  (state: SessionsState) => selectEntities(state)
);

export const getSessionsIds = createSelector(
  getSessionsState,
  (state: SessionsState) => selectIds(state)
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

export const getSessionItems = createSelector(
  getSelected,
  getAllSessionItems,
  (session, sessionItems) => {
    return (
      session &&
      sessionItems.filter((sessionItem) => sessionItem.sessionId === session.id)
    );
  }
);

export const getPages = createSelector(
  getSelectedId,
  getAllSessions,
  (id, sessions: Session[]): Pages => {
    const sorted = sessions.sort((a, b) => a.order - b.order).map((s) => s.id);
    const idIndex = sorted.findIndex((currentId) => currentId === id);
    const isFirst = idIndex === 0;
    const isLast = idIndex === sorted.length - 1;
    const previousId = isFirst ? null : sorted[idIndex - 1];
    const nextId = isLast ? null : sorted[idIndex + 1];
    return {
      isFirst,
      isLast,
      previousId,
      nextId,
    };
  }
);
