import { createSelector } from '@ngrx/store';
import {
  SessionItemStatisticsState,
  sessionItemStatisticsAdapter,
} from './session-item-statistics.reducer';
import { getAllSetStatistics } from '../set-statistics/set-statistics.selectors';
import { trainingSelector } from '../selector';

export const getSessionItemStatisticsState = createSelector(
  trainingSelector,
  (state) => state.sessionItemStatistics
);

const {
  selectAll,
  selectEntities,
} = sessionItemStatisticsAdapter.getSelectors();

export const getSessionItemStatisticsLoaded = createSelector(
  getSessionItemStatisticsState,
  (state: SessionItemStatisticsState) => state.loaded
);

export const getSessionItemStatisticsError = createSelector(
  getSessionItemStatisticsState,
  (state: SessionItemStatisticsState) => state.error
);

export const getAllSessionItemStatistics = createSelector(
  getSessionItemStatisticsState,
  (state: SessionItemStatisticsState) => selectAll(state)
);

export const getSessionItemStatisticsEntities = createSelector(
  getSessionItemStatisticsState,
  (state: SessionItemStatisticsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSessionItemStatisticsState,
  (state: SessionItemStatisticsState) => state.selectedId
);

export const getSelected = createSelector(
  getSessionItemStatisticsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getSetStatistics = createSelector(
  getAllSetStatistics,
  getSelectedId,
  (setStatistics, sessionItemStatisticId) =>
    setStatistics.filter(
      (s) => s.sessionItemStatisticId === sessionItemStatisticId
    )
);
