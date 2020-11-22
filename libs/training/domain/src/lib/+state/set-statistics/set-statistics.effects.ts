import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromSetStatistics from './set-statistics.reducer';
import * as SetStatisticsActions from './set-statistics.actions';

@Injectable()
export class SetStatisticsEffects {
  loadSetStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetStatisticsActions.loadSetStatistics),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return SetStatisticsActions.loadSetStatisticsSuccess({
            setStatistics: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SetStatisticsActions.loadSetStatisticsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
