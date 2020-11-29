import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as MealsActions from './meals.actions';

@Injectable()
export class MealsEffects {
  loadMeals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MealsActions.loadMeals),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return MealsActions.loadMealsSuccess({ meals: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return MealsActions.loadMealsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
