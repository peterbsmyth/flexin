import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { SessionItemStatisticsActions } from './actions';
import { map, mapTo } from 'rxjs/operators';
import { SessionItemStatisticDataService } from '../../infrastructure/session-item-statistic.data.service';

@Injectable()
export class SessionItemStatisticsEffects {
  loadSessionItemStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemStatisticsActions.loadSessionItemStatistics),
      fetch({
        run: () => {
          return this.backend.getAll().pipe(
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

  loadSessionItemStatisticBySessionItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SessionItemStatisticsActions.loadSessionItemStatisticBySessionItem
      ),
      fetch({
        run: ({ id }) => {
          return this.backend.getAllBySessionItem(id).pipe(
            map((sessionItemStatistic) =>
              SessionItemStatisticsActions.loadSessionItemStatisticBySessionItemSuccess(
                {
                  sessionItemStatistic,
                }
              )
            )
          );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemStatisticsActions.loadSessionItemStatisticBySessionItemFailure(
            {
              error,
            }
          );
        },
      })
    )
  );

  saveSessionItemStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemStatisticsActions.saveSessionItemStatistic),
      fetch({
        run: (action) => {
          return this.backend.postOne(action.sessionItemStatistic).pipe(
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
      optimisticUpdate({
        run: (action) => {
          return this.backend
            .patchOne(action.sessionItemStatistic)
            .pipe(
              mapTo(
                SessionItemStatisticsActions.updateSessionItemStatisticSuccess()
              )
            );
        },
        undoAction: (action, error) => {
          console.error('Error', error);
          return SessionItemStatisticsActions.updateSessionItemStatisticFailure(
            {
              error,
            }
          );
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private backend: SessionItemStatisticDataService
  ) {}
}
