import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SESSIONSTATISTICS_FEATURE_KEY,
  SessionStatisticsState,
  sessionStatisticsAdapter,
} from './session-statistics.reducer';
import { PartialState } from '../root.reducer';
// Lookup the 'SessionStatistics' feature state managed by NgRx
export const getSessionStatisticsState = createFeatureSelector<
  PartialState,
  SessionStatisticsState
>(SESSIONSTATISTICS_FEATURE_KEY);

const { selectAll, selectEntities } = sessionStatisticsAdapter.getSelectors();

export const getSessionStatisticsLoaded = createSelector(
  getSessionStatisticsState,
  (state: SessionStatisticsState) => state.loaded
);

export const getSessionStatisticsError = createSelector(
  getSessionStatisticsState,
  (state: SessionStatisticsState) => state.error
);

export const getAllSessionStatistics = createSelector(
  getSessionStatisticsState,
  (state: SessionStatisticsState) => selectAll(state)
);

export const getSessionStatisticsEntities = createSelector(
  getSessionStatisticsState,
  (state: SessionStatisticsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSessionStatisticsState,
  (state: SessionStatisticsState) => state.selectedId
);

export const getSelected = createSelector(
  getSessionStatisticsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
