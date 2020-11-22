import { createSelector } from '@ngrx/store';
import { trainingSelector } from '../selector';
import {
  V2SetStatisticsState,
  v2SetStatisticsAdapter,
} from './v2-set-statistics.reducer';

export const getV2SetStatisticsState = createSelector(
  trainingSelector,
  (state) => state.v2SetStatistics
);

const { selectAll, selectEntities } = v2SetStatisticsAdapter.getSelectors();

export const getV2SetStatisticsLoaded = createSelector(
  getV2SetStatisticsState,
  (state: V2SetStatisticsState) => state.loaded
);

export const getV2SetStatisticsError = createSelector(
  getV2SetStatisticsState,
  (state: V2SetStatisticsState) => state.error
);

export const getAllV2SetStatistics = createSelector(
  getV2SetStatisticsState,
  (state: V2SetStatisticsState) => selectAll(state)
);

export const getV2SetStatisticsEntities = createSelector(
  getV2SetStatisticsState,
  (state: V2SetStatisticsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getV2SetStatisticsState,
  (state: V2SetStatisticsState) => state.selectedId
);

export const getSelected = createSelector(
  getV2SetStatisticsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
