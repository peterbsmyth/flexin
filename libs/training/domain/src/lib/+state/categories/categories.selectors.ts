import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../state';
import {
  CATEGORIES_FEATURE_KEY,
  CategoriesState,
  categoriesAdapter,
} from './categories.reducer';

// Lookup the 'Categories' feature state managed by NgRx
export const getCategoriesState = createFeatureSelector<State, CategoriesState>(
  CATEGORIES_FEATURE_KEY
);

const { selectAll, selectEntities } = categoriesAdapter.getSelectors();

export const getCategoriesLoaded = createSelector(
  getCategoriesState,
  (state: CategoriesState) => state.loaded
);

export const getCategoriesError = createSelector(
  getCategoriesState,
  (state: CategoriesState) => state.error
);

export const getAllCategories = createSelector(
  getCategoriesState,
  (state: CategoriesState) => selectAll(state)
);

export const getCategoriesEntities = createSelector(
  getCategoriesState,
  (state: CategoriesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCategoriesState,
  (state: CategoriesState) => state.selectedId
);

export const getSelected = createSelector(
  getCategoriesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
