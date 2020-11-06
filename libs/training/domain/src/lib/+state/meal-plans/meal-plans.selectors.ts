import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MEALPLANS_FEATURE_KEY,
  MealPlansState,
  mealPlansAdapter,
} from './meal-plans.reducer';
import { PartialState } from '../root.reducer';

// Lookup the 'MealPlans' feature state managed by NgRx
export const getMealPlansState = createFeatureSelector<
  PartialState,
  MealPlansState
>(MEALPLANS_FEATURE_KEY);

const { selectAll, selectEntities } = mealPlansAdapter.getSelectors();

export const getMealPlansLoaded = createSelector(
  getMealPlansState,
  (state: MealPlansState) => state.loaded
);

export const getMealPlansError = createSelector(
  getMealPlansState,
  (state: MealPlansState) => state.error
);

export const getAllMealPlans = createSelector(
  getMealPlansState,
  (state: MealPlansState) => selectAll(state)
);

export const getMealPlansEntities = createSelector(
  getMealPlansState,
  (state: MealPlansState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getMealPlansState,
  (state: MealPlansState) => state.selectedId
);

export const getSelected = createSelector(
  getMealPlansEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
