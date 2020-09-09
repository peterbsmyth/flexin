import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { SetStatisticsActions } from './actions';
import { map } from 'rxjs/operators';
import { SetStatisticDataService } from '../../infrastructure/set-statistic.data.service';

@Injectable()
export class SetStatisticsEffects {
  loadSetStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetStatisticsActions.loadSetStatistics),
      fetch({
        run: () => {
          return this.backend
            .getAll()
            .pipe(
              map((setStatistics) =>
                SetStatisticsActions.loadSetStatisticsSuccess({
                  setStatistics,
                })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SetStatisticsActions.loadSetStatisticsFailure({
            error,
          });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private backend: SetStatisticDataService
  ) {}
}
