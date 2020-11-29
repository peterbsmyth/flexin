import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as MealPlansActions from './meal-plans.actions';

@Injectable()
export class MealPlansEffects {
  loadMealPlans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MealPlansActions.loadMealPlans),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return MealPlansActions.loadMealPlansSuccess({ mealPlans: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return MealPlansActions.loadMealPlansFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
