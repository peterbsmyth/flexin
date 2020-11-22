import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ProgramStatisticsState,
  programStatisticsAdapter,
} from './program-statistics.reducer';
import { trainingSelector } from '../selector';

export const getProgramStatisticsState = createSelector(
  trainingSelector,
  (state) => state.programStatistics
);

const { selectAll, selectEntities } = programStatisticsAdapter.getSelectors();

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
