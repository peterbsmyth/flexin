import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromMealStatistics from './meal-statistics.reducer';
import * as MealStatisticsActions from './meal-statistics.actions';

@Injectable()
export class MealStatisticsEffects {
  loadMealStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MealStatisticsActions.loadMealStatistics),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return MealStatisticsActions.loadMealStatisticsSuccess({
            mealStatistics: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return MealStatisticsActions.loadMealStatisticsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
