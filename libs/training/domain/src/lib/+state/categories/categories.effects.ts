import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { CategoriesDataService } from '../../infrastructure/categories.data.service';
import * as CategoriesActions from './categories.actions';

@Injectable()
export class CategoriesEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      fetch({
        run: () =>
          this.backend
            .getAll()
            .pipe(
              map((categories) =>
                CategoriesActions.loadCategoriesSuccess({ categories })
              )
            ),
        onError: (action, error) => {
          console.error('Error', error);
          return CategoriesActions.loadCategoriesFailure({ error });
        },
      })
    )
  );

  loadCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategory),
      switchMap(({ id }) =>
        this.backend.getOne(id).pipe(
          map((category) =>
            CategoriesActions.loadCategorySuccess({
              category,
            })
          )
        )
      )
    )
  );

  saveCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.saveCategory),
      switchMap(({ category }) =>
        this.backend.saveOne(category).pipe(
          map((c) =>
            CategoriesActions.saveCategorySuccess({
              category: c,
            })
          )
        )
      )
    )
  );

  patchCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.patchCategory),
      switchMap(({ category }) =>
        this.backend
          .patchOne(category)
          .pipe(mapTo(CategoriesActions.patchCategorySuccess()))
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.deleteCategory),
      switchMap(({ categoryId }) =>
        this.backend
          .deleteOne(categoryId)
          .pipe(map(() => CategoriesActions.deleteCategorySuccess()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backend: CategoriesDataService
  ) {}
}
