import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as FoodsActions from './foods.actions';

@Injectable()
export class FoodsEffects {
  loadFoods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FoodsActions.loadFoods),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return FoodsActions.loadFoodsSuccess({ foods: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return FoodsActions.loadFoodsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
