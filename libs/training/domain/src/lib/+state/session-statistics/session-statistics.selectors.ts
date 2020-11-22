import { createSelector } from '@ngrx/store';
import {
  SessionStatisticsState,
  sessionStatisticsAdapter,
} from './session-statistics.reducer';
import { trainingSelector } from '../selector';

export const getSessionStatisticsState = createSelector(
  trainingSelector,
  (state) => state.sessionStatistics
);

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
