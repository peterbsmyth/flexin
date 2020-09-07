import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SESSIONITEMS_FEATURE_KEY,
  State,
  SessionItemsPartialState,
  sessionItemsAdapter,
} from './session-items.reducer';

// Lookup the 'SessionItems' feature state managed by NgRx
export const getSessionItemsState = createFeatureSelector<
  SessionItemsPartialState,
  State
>(SESSIONITEMS_FEATURE_KEY);

const { selectAll, selectEntities } = sessionItemsAdapter.getSelectors();

export const getSessionItemsLoaded = createSelector(
  getSessionItemsState,
  (state: State) => state.loaded
);

export const getSessionItemsError = createSelector(
  getSessionItemsState,
  (state: State) => state.error
);

export const getAllSessionItems = createSelector(
  getSessionItemsState,
  (state: State) => selectAll(state)
);

export const getSessionItemsEntities = createSelector(
  getSessionItemsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSessionItemsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getSessionItemsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
