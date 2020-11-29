import { createSelector } from '@ngrx/store';
import { trainingSelector } from '../selector';
import { mealPlansAdapter, MealPlansState } from './meal-plans.reducer';

export const getMealPlansState = createSelector(
  trainingSelector,
  (state) => state.mealPlans
);

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
