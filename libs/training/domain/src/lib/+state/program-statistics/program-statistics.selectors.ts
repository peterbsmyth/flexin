import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PROGRAMSTATISTICS_FEATURE_KEY,
  ProgramStatisticsState,
  programStatisticsAdapter,
} from './program-statistics.reducer';
import { PartialState } from '../root.reducer';

// Lookup the 'ProgramStatistics' feature state managed by NgRx
export const getProgramStatisticsState = createFeatureSelector<
  PartialState,
  ProgramStatisticsState
>(PROGRAMSTATISTICS_FEATURE_KEY);

const {
  selectAll,
  selectEntities,
} = programStatisticsAdapter.getSelectors();

export const getProgramStatisticsLoaded = createSelector(
  getProgramStatisticsState,
  (state: ProgramStatisticsState) => state.loaded
);

export const getProgramStatisticsError = createSelector(
  getProgramStatisticsState,
  (state: ProgramStatisticsState) => state.error
);

export const getAllProgramStatistics = createSelector(
  getProgramStatisticsState,
  (state: ProgramStatisticsState) => selectAll(state)
);

export const getProgramStatisticsEntities = createSelector(
  getProgramStatisticsState,
  (state: ProgramStatisticsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getProgramStatisticsState,
  (state: ProgramStatisticsState) => state.selectedId
);

export const getSelected = createSelector(
  getProgramStatisticsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
