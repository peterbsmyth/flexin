import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PROGRAMS_FEATURE_KEY,
  ProgramsState,
  programsAdapter,
} from './programs.reducer';
import { PartialState } from '../root.reducer';
import { getAllWeeks } from '../weeks/weeks.selectors';

// Lookup the 'Programs' feature state managed by NgRx
export const getProgramsState = createFeatureSelector<
  PartialState,
  ProgramsState
>(PROGRAMS_FEATURE_KEY);

const { selectAll, selectEntities } = programsAdapter.getSelectors();

export const getProgramsLoaded = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.loaded
);

export const getProgramsError = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.error
);

export const getAllPrograms = createSelector(
  getProgramsState,
  (state: ProgramsState) => selectAll(state)
);

export const getProgramsEntities = createSelector(
  getProgramsState,
  (state: ProgramsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.selectedId
);

export const getSelected = createSelector(
  getProgramsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getWeeks = createSelector(
  getSelected,
  getAllWeeks,
  (program, weeks) => {
    return program && weeks.filter((week) => week.programId === program.id);
  }
);
