import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MEALSTATISTICS_FEATURE_KEY,
  MealStatisticsState,
  mealStatisticsAdapter,
} from './meal-statistics.reducer';
import { PartialState } from '../root.reducer';

// Lookup the 'MealStatistics' feature state managed by NgRx
export const getMealStatisticsState = createFeatureSelector<
  PartialState,
  MealStatisticsState
>(MEALSTATISTICS_FEATURE_KEY);

const { selectAll, selectEntities } = mealStatisticsAdapter.getSelectors();

export const getMealStatisticsLoaded = createSelector(
  getMealStatisticsState,
  (state: MealStatisticsState) => state.loaded
);

export const getMealStatisticsError = createSelector(
  getMealStatisticsState,
  (state: MealStatisticsState) => state.error
);

export const getAllMealStatistics = createSelector(
  getMealStatisticsState,
  (state: MealStatisticsState) => selectAll(state)
);

export const getMealStatisticsEntities = createSelector(
  getMealStatisticsState,
  (state: MealStatisticsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getMealStatisticsState,
  (state: MealStatisticsState) => state.selectedId
);

export const getSelected = createSelector(
  getMealStatisticsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
