import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PartialState } from '../root.reducer';
import {
  V2SETSTATISTICS_FEATURE_KEY,
  V2SetStatisticsState,
  v2SetStatisticsAdapter,
} from './v2-set-statistics.reducer';

// Lookup the 'V2SetStatistics' feature state managed by NgRx
export const getV2SetStatisticsState = createFeatureSelector<
  PartialState,
  V2SetStatisticsState
>(V2SETSTATISTICS_FEATURE_KEY);

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
