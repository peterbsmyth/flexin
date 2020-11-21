import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SETSTATISTICS_FEATURE_KEY,
  SetStatisticsState,
  setStatisticsAdapter,
} from './set-statistics.reducer';
import { PartialState } from '../root.reducer';

// Lookup the 'SetStatistics' feature state managed by NgRx
export const getSetStatisticsState = createFeatureSelector<
  PartialState,
  SetStatisticsState
>(SETSTATISTICS_FEATURE_KEY);

const { selectAll, selectEntities } = setStatisticsAdapter.getSelectors();

export const getSetStatisticsLoaded = createSelector(
  getSetStatisticsState,
  (state: SetStatisticsState) => state.loaded
);

export const getSetStatisticsAscendantsLoaded = createSelector(
  getSetStatisticsState,
  (state: SetStatisticsState) => state.ascendantsLoaded
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
