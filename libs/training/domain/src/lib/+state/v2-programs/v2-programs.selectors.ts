import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PartialState } from '../root.reducer';
import {
  V2PROGRAMS_FEATURE_KEY,
  V2ProgramsState,
  v2ProgramsAdapter,
} from './v2-programs.reducer';

// Lookup the 'V2Programs' feature state managed by NgRx
export const getV2ProgramsState = createFeatureSelector<
  PartialState,
  V2ProgramsState
>(V2PROGRAMS_FEATURE_KEY);

const { selectAll, selectEntities } = v2ProgramsAdapter.getSelectors();

export const getV2ProgramsLoaded = createSelector(
  getV2ProgramsState,
  (state: V2ProgramsState) => state.loaded
);

export const getV2ProgramsError = createSelector(
  getV2ProgramsState,
  (state: V2ProgramsState) => state.error
);

export const getAllV2Programs = createSelector(
  getV2ProgramsState,
  (state: V2ProgramsState) => selectAll(state)
);

export const getV2ProgramsEntities = createSelector(
  getV2ProgramsState,
  (state: V2ProgramsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getV2ProgramsState,
  (state: V2ProgramsState) => state.selectedId
);

export const getSelected = createSelector(
  getV2ProgramsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
