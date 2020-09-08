import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SESSIONITEMS_FEATURE_KEY,
  SessionItemsState,
  sessionItemsAdapter,
} from './session-items.reducer';
import { PartialState } from '../root.reducer';
import { Pages } from '@bod/shared/models';

// Lookup the 'SessionItems' feature state managed by NgRx
export const getSessionItemsState = createFeatureSelector<
  PartialState,
  SessionItemsState
>(SESSIONITEMS_FEATURE_KEY);

const { selectAll, selectEntities, selectIds } = sessionItemsAdapter.getSelectors();

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

export const getPages = createSelector(
  getSelectedId,
  getSessionItemsIds,
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