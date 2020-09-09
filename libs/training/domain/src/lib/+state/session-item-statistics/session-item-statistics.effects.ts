import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { SessionItemStatisticsActions } from './actions';
import { map } from 'rxjs/operators';
import { SessionItemStatisticDataService } from '../../infrastructure/session-item-statistic.data.service';

@Injectable()
export class SessionItemStatisticsEffects {
  loadSessionItemStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemStatisticsActions.loadSessionItemStatistics),
      fetch({
        run: () => {
          return this.backend
            .getAll()
            .pipe(
              map((sessionItemStatistics) =>
                SessionItemStatisticsActions.loadSessionItemStatisticsSuccess({
                  sessionItemStatistics,
                })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemStatisticsActions.loadSessionItemStatisticsFailure({
            error,
          });
        },
      })
    )
  );

  saveSessionItemStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemStatisticsActions.saveSessionItemStatistic),
      fetch({
        run: (action) => {
          return this.backend
            .postOne(action.sessionItemStatistic)
            .pipe(
              map((sessionItemStatistic) =>
                SessionItemStatisticsActions.saveSessionItemStatisticSuccess({
                  sessionItemStatistic,
                })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemStatisticsActions.saveSessionItemStatisticFailure({
            error,
          });
        },
      })
    )
  );

  updateSessionItemStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemStatisticsActions.updateSessionItemStatistic),
      fetch({
        run: (action) => {
          return this.backend
            .putOne(action.sessionItemStatistic)
            .pipe(
              map((sessionItemStatistic) =>
                SessionItemStatisticsActions.updateSessionItemStatisticSuccess({
                  sessionItemStatistic,
                })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemStatisticsActions.updateSessionItemStatisticFailure({
            error,
          });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private backend: SessionItemStatisticDataService
  ) {}
}
