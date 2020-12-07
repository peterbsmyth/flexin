import { Category } from '@bod/shared/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as CategoriesActions from './categories.actions';

export const CATEGORIES_FEATURE_KEY = 'categories';

export interface CategoriesState extends EntityState<Category> {
  selectedId?: string | number; // which Categories record has been selected
  loaded: boolean; // has the Categories list been loaded
  error?: string | null; // last known error (if any)
}

export const categoriesAdapter: EntityAdapter<Category> = createEntityAdapter<
  Category
>();

export const initialState: CategoriesState = categoriesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const categoriesReducer = createReducer(
  initialState,
  on(
    CategoriesActions.loadCategories,
    CategoriesActions.loadCategory,
    (state) => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(CategoriesActions.selectCategory, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) =>
    categoriesAdapter.upsertMany(categories, { ...state, loaded: true })
  ),
  on(CategoriesActions.loadCategorySuccess, (state, { category }) =>
    categoriesAdapter.upsertOne(category, { ...state, loaded: true })
  ),
  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: CategoriesState | undefined, action: Action) {
  return categoriesReducer(state, action);
}
