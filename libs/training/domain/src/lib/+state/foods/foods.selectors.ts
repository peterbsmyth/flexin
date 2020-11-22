import { createSelector } from '@ngrx/store';
import { FoodsState, foodsAdapter } from './foods.reducer';
import { trainingSelector } from '../selector';

export const getFoodsState = createSelector(
  trainingSelector,
  (state) => state.foods
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
