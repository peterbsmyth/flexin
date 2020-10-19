import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SESSIONITEMS_FEATURE_KEY,
  SessionItemsState,
  sessionItemsAdapter,
} from './session-items.reducer';
import { PartialState } from '../root.reducer';
import { Pages } from '@bod/shared/models';

import {
  SessionsState,
  SESSIONS_FEATURE_KEY,
} from '../sessions/sessions.reducer';
import { getExercisesEntities } from '../exercises/exercises.selectors';

// Lookup the 'SessionItems' feature state managed by NgRx
export const getSessionItemsState = createFeatureSelector<
  PartialState,
  SessionItemsState
>(SESSIONITEMS_FEATURE_KEY);

export const getSessionsState = createFeatureSelector<
  PartialState,
  SessionsState
>(SESSIONS_FEATURE_KEY);

export const getSelectedSessionId = createSelector(
  getSessionsState,
  (state: SessionsState) => state.selectedId
);

const {
  selectAll,
  selectEntities,
  selectIds,
} = sessionItemsAdapter.getSelectors();

export const getSessionItemsLoaded = createSelector(
  getSessionItemsState,
  (state: SessionItemsState) => state.loaded
);

export const getSessionItemsError = createSelector(
  getSessionItemsState,
  (state: SessionItemsState) => state.error
);

export const getAllSessionItems = createSelector(
  getSessionItemsState,
  (state: SessionItemsState) => selectAll(state)
);

export const getSessionItemsEntities = createSelector(
  getSessionItemsState,
  (state: SessionItemsState) => selectEntities(state)
);

export const getSessionItemsIds = createSelector(
  getSessionItemsState,
  (state: SessionItemsState) => selectIds(state)
);

export const getSelectedId = createSelector(
  getSessionItemsState,
  (state: SessionItemsState) => state.selectedId
);

export const getSelected = createSelector(
  getSessionItemsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getSelectedWithExercise = createSelector(
  getSelected,
  getExercisesEntities,
  (sessionItem, entities) => ({
    ...sessionItem,
    exercise: entities[sessionItem.exerciseId]
      ? entities[sessionItem.exerciseId]
      : null,
  })
);

export const getPages = createSelector(
  getSelectedId,
  getSessionItemsIds,
  (id, ids): Pages => {
    const idIndex = ids.findIndex((currentId) => currentId === id);
    const isFirst = idIndex === 0;
    const isLast = idIndex === ids.length - 1;
    const previousId = isFirst ? null : ids[idIndex - 1];
    const nextId = isLast ? null : ids[idIndex + 1];
    return {
      isFirst,
      isLast,
      previousId,
      nextId,
    };
  }
);
