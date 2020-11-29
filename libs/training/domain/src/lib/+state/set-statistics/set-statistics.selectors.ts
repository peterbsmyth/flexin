import { createSelector } from '@ngrx/store';
import { trainingSelector } from '../selector';
import {
  setStatisticsAdapter,
  SetStatisticsState,
} from './set-statistics.reducer';

export const getSetStatisticsState = createSelector(
  trainingSelector,
  (state) => state.setStatistics
);

const { selectAll, selectEntities } = setStatisticsAdapter.getSelectors();

export const getSetStatisticsLoaded = createSelector(
  getSetStatisticsState,
  (state: SetStatisticsState) => state.loaded
);

export const getSetStatisticsError = createSelector(
  getSetStatisticsState,
  (state: SetStatisticsState) => state.error
);

export const getAllSetStatistics = createSelector(
  getSetStatisticsState,
  (state: SetStatisticsState) => selectAll(state)
);

export const getSetStatisticsEntities = createSelector(
  getSetStatisticsState,
  (state: SetStatisticsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSetStatisticsState,
  (state: SetStatisticsState) => state.selectedId
);

export const getSelected = createSelector(
  getSetStatisticsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
