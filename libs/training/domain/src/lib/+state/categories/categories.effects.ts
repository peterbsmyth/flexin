import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as CategoriesActions from './categories.actions';

@Injectable()
export class CategoriesEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CategoriesActions.loadCategoriesSuccess({ categories: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return CategoriesActions.loadCategoriesFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
