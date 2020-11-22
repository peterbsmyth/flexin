import { createSelector } from '@ngrx/store';
import {
  SessionItemsState,
  sessionItemsAdapter,
} from './session-items.reducer';
import { Pages } from '@bod/shared/models';

import { SessionsState } from '../sessions/sessions.reducer';
import { getExercisesEntities } from '../exercises/exercises.selectors';
import { trainingSelector } from '../selector';

export const getSessionItemsState = createSelector(
  trainingSelector,
  (state) => state.sessionItems
);

export const getSessionsState = createSelector(
  trainingSelector,
  (state) => state.sessions
);

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
