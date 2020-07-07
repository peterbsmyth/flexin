import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PROGRAMS_FEATURE_KEY,
  State,
  ProgramsPartialState,
  programsAdapter,
} from './programs.reducer';

// Lookup the 'Programs' feature state managed by NgRx
export const getProgramsState = createFeatureSelector<
  ProgramsPartialState,
  State
>(PROGRAMS_FEATURE_KEY);

const { selectAll, selectEntities } = programsAdapter.getSelectors();

export const getProgramsLoaded = createSelector(
  getProgramsState,
  (state: State) => state.loaded
);

export const getProgramsError = createSelector(
  getProgramsState,
  (state: State) => state.error
);

export const getAllPrograms = createSelector(getProgramsState, (state: State) =>
  selectAll(state)
);

export const getProgramsEntities = createSelector(
  getProgramsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getProgramsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getProgramsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
