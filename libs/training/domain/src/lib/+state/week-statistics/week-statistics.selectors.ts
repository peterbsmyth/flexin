import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WEEKSTATISTICS_FEATURE_KEY,
  WeekStatisticsState,
  weekStatisticsAdapter,
} from './week-statistics.reducer';
import { PartialState } from '../root.reducer';

// Lookup the 'WeekStatistics' feature state managed by NgRx
export const getWeekStatisticsState = createFeatureSelector<
  PartialState,
  WeekStatisticsState
>(WEEKSTATISTICS_FEATURE_KEY);

const {
  selectAll,
  selectEntities,
} = weekStatisticsAdapter.getSelectors();

export const getWeekStatisticsLoaded = createSelector(
  getWeekStatisticsState,
  (state: WeekStatisticsState) => state.loaded
);

export const getWeekStatisticsError = createSelector(
  getWeekStatisticsState,
  (state: WeekStatisticsState) => state.error
);

export const getAllWeekStatistics = createSelector(
  getWeekStatisticsState,
  (state: WeekStatisticsState) => selectAll(state)
);

export const getWeekStatisticsEntities = createSelector(
  getWeekStatisticsState,
  (state: WeekStatisticsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getWeekStatisticsState,
  (state: WeekStatisticsState) => state.selectedId
);

export const getSelected = createSelector(
  getWeekStatisticsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
