import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SESSIONS_FEATURE_KEY,
  SessionsState,
  sessionsAdapter,
} from './sessions.reducer';
import { PartialState } from '../root.reducer';
import { getSessionItemsEntities } from '../session-items/session-items.selectors';
import { Pages } from '@bod/shared/models';

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
  getSessionItemsEntities,
  (session, sessionItemsEntities) => {
    return (
      session &&
      session.items.map((sessionItem) => sessionItemsEntities[sessionItem])
    );
  }
);

export const getPages = createSelector(
  getSelectedId,
  getSessionsIds,
  (id, ids): Pages => {
    const idIndex = ids.findIndex(currentId => currentId === id);
    const isFirst = idIndex === 0;
    const isLast = idIndex === (ids.length - 1);
    const previousId = isFirst ? null : ids[idIndex - 1];
    const nextId = isLast ? null : ids[idIndex + 1];
    return {
      isFirst,
      isLast,
      previousId,
      nextId
    };
  }
);
