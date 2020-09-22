import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { SessionStatisticDataService } from '../../infrastructure/session-statistic.data.service';
import { SessionStatisticsActions } from './actions';

@Injectable()
export class SessionStatisticsEffects {
  loadSessionStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionStatisticsActions.loadSessionStatistics),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return SessionStatisticsActions.loadSessionStatisticsSuccess({
            sessionStatistics: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionStatisticsActions.loadSessionStatisticsFailure({
            error,
          });
        },
      })
    )
  );

  loadSessionStatisticBySession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionStatisticsActions.loadSessionStatisticBySession),
      fetch({
        run: (action) => {
          return this.backend.getOneBySession(action.id).pipe(
            map((sessionStatistic) =>
              SessionStatisticsActions.loadSessionStatisticBySessionSuccess({
                sessionStatistic,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          if (error.error.error.statusCode === 404) {
            return SessionStatisticsActions.saveSessionStatisticBySession(action);
          } else {
            return SessionStatisticsActions.loadSessionStatisticBySessionFailure({
              error,
            });
          }
        },
      })
    )
  );

  saveSessionStatisticBySession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionStatisticsActions.saveSessionStatisticBySession),
      fetch({
        run: (action) => {
          return this.backend.postOneBySession(action.id).pipe(
            map((sessionStatistic) =>
              SessionStatisticsActions.saveSessionStatisticBySessionSuccess({
                sessionStatistic,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SessionStatisticsActions.saveSessionStatisticBySessionFailure({
            error,
          });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private backend: SessionStatisticDataService
  ) {}
}
