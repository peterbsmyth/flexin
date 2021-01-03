import { Category } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadCategories = createAction('[Categories] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Load Categories Failure',
  props<{ error: string }>()
);

export const loadCategory = createAction(
  '[Categories] Load Category',
  props<{ id: number }>()
);

export const loadCategorySuccess = createAction(
  '[Categories] Load Category Success',
  props<{ category: Category }>()
);

export const patchCategory = createAction(
  '[Categories] Patch Category',
  props<{ category: Category }>()
);

export const patchCategorySuccess = createAction(
  '[Categories] Patch Category Success'
);

export const saveCategory = createAction(
  '[Categories] Save Category',
  props<{ category: Category }>()
);

export const saveCategorySuccess = createAction(
  '[Categories] Save Category Success',
  props<{ category: Category }>()
);

export const deleteCategory = createAction(
  '[Categories] Delete Category',
  props<{ categoryId: number }>()
);

export const deleteCategorySuccess = createAction(
  '[Categories] Delete Category Success'
);

export const selectCategory = createAction(
  '[Categories] Select Category',
  props<{ id: number }>()
);
