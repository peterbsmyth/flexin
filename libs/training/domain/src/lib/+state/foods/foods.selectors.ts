import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FOODS_FEATURE_KEY, FoodsState, foodsAdapter } from './foods.reducer';
import { State } from '../state';

// Lookup the 'Foods' feature state managed by NgRx
export const getFoodsState = createFeatureSelector<State, FoodsState>(
  FOODS_FEATURE_KEY
);

const { selectAll, selectEntities } = foodsAdapter.getSelectors();

export const getFoodsLoaded = createSelector(
  getFoodsState,
  (state: FoodsState) => state.loaded
);

export const getFoodsError = createSelector(
  getFoodsState,
  (state: FoodsState) => state.error
);

export const getAllFoods = createSelector(getFoodsState, (state: FoodsState) =>
  selectAll(state)
);

export const getFoodsEntities = createSelector(
  getFoodsState,
  (state: FoodsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getFoodsState,
  (state: FoodsState) => state.selectedId
);

export const getSelected = createSelector(
  getFoodsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
