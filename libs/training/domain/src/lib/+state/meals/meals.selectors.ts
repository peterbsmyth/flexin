import { createSelector } from '@ngrx/store';
import { trainingSelector } from '../selector';
import { mealsAdapter, MealsState } from './meals.reducer';

export const getMealsState = createSelector(
  trainingSelector,
  (state) => state.meals
);

const { selectAll, selectEntities } = mealsAdapter.getSelectors();

export const getMealsLoaded = createSelector(
  getMealsState,
  (state: MealsState) => state.loaded
);

export const getMealsError = createSelector(
  getMealsState,
  (state: MealsState) => state.error
);

export const getAllMeals = createSelector(getMealsState, (state: MealsState) =>
  selectAll(state)
);

export const getMealsEntities = createSelector(
  getMealsState,
  (state: MealsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getMealsState,
  (state: MealsState) => state.selectedId
);

export const getSelected = createSelector(
  getMealsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
