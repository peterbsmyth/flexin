import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WORKOUTSTATISTICS_FEATURE_KEY,
  WorkoutStatisticsState,
  workoutStatisticsAdapter,
} from './workout-statistics.reducer';
import { PartialState } from '../root.reducer';

// Lookup the 'WorkoutStatistics' feature state managed by NgRx
export const getWorkoutStatisticsState = createFeatureSelector<
  PartialState,
  WorkoutStatisticsState
>(WORKOUTSTATISTICS_FEATURE_KEY);

const { selectAll, selectEntities } = workoutStatisticsAdapter.getSelectors();

export const getWorkoutStatisticsLoaded = createSelector(
  getWorkoutStatisticsState,
  (state: WorkoutStatisticsState) => state.loaded
);

export const getWorkoutStatisticsError = createSelector(
  getWorkoutStatisticsState,
  (state: WorkoutStatisticsState) => state.error
);

export const getAllWorkoutStatistics = createSelector(
  getWorkoutStatisticsState,
  (state: WorkoutStatisticsState) => selectAll(state)
);

export const getWorkoutStatisticsEntities = createSelector(
  getWorkoutStatisticsState,
  (state: WorkoutStatisticsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getWorkoutStatisticsState,
  (state: WorkoutStatisticsState) => state.selectedId
);

export const getSelected = createSelector(
  getWorkoutStatisticsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
