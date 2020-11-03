import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromV2SetStatistics from './v2-set-statistics.reducer';
import * as V2SetStatisticsActions from './v2-set-statistics.actions';

@Injectable()
export class V2SetStatisticsEffects {
  loadV2SetStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(V2SetStatisticsActions.loadV2SetStatistics),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return V2SetStatisticsActions.loadV2SetStatisticsSuccess({
            v2SetStatistics: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return V2SetStatisticsActions.loadV2SetStatisticsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
