import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PROGRAMSTATISTICS_FEATURE_KEY,
  State,
  ProgramStatisticsPartialState,
  programStatisticsAdapter,
} from './program-statistics.reducer';

// Lookup the 'ProgramStatistics' feature state managed by NgRx
export const getProgramStatisticsState = createFeatureSelector<
  ProgramStatisticsPartialState,
  State
>(PROGRAMSTATISTICS_FEATURE_KEY);

const { selectAll, selectEntities } = programStatisticsAdapter.getSelectors();

export const getProgramStatisticsLoaded = createSelector(
  getProgramStatisticsState,
  (state: State) => state.loaded
);

export const getProgramStatisticsError = createSelector(
  getProgramStatisticsState,
  (state: State) => state.error
);

export const getAllProgramStatistics = createSelector(
  getProgramStatisticsState,
  (state: State) => selectAll(state)
);

export const getProgramStatisticsEntities = createSelector(
  getProgramStatisticsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getProgramStatisticsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getProgramStatisticsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
