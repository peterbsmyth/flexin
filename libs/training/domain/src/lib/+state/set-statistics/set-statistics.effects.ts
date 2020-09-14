import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate, optimisticUpdate } from '@nrwl/angular';
import { SetStatisticsActions } from './actions';
import { catchError, delay, filter, map, mapTo, retry, switchMap, withLatestFrom } from 'rxjs/operators';
import { SetStatisticDataService } from '../../infrastructure/set-statistic.data.service';
import { throwError } from 'rxjs';
import { SessionItemStatisticsFacade } from '../../application/session-item-statistics.facade';

@Injectable()
export class SetStatisticsEffects {
  loadSetStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetStatisticsActions.loadSetStatistics),
      fetch({
        run: () => {
          return this.backend.getAll().pipe(
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

  loadSetStatisticsBySessionItemStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetStatisticsActions.loadSetStatisticsBySessionItemStatistic),
      fetch({
        run: ({ id }) => {
          return this.backend.getAllBySessionItemStatistic(id).pipe(
            map((setStatistics) =>
              SetStatisticsActions.loadSetStatisticsBySessionItemStatisticSuccess({
                setStatistics,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SetStatisticsActions.loadSetStatisticsBySessionItemStatisticFailure({
            error,
          });
        },
      })
    )
  );

  saveSetStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetStatisticsActions.saveSetStatistic),
      fetch({
        run: (action) => {
          return this.backend.postOne(action.setStatistic).pipe(
            map((setStatistic) =>
              SetStatisticsActions.saveSetStatisticSuccess({
                setStatistic,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SetStatisticsActions.saveSetStatisticFailure({
            error,
          });
        },
      })
    )
  );

  updateSetStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetStatisticsActions.updateSetStatistic),
      optimisticUpdate({
        run: (action) => {
          return this.backend
            .patchOne(action.setStatistic)
            .pipe(mapTo(SetStatisticsActions.updateSetStatisticSuccess()));
        },
        undoAction: (action, error) => {
          console.error('Error', error);
          return SetStatisticsActions.updateSetStatisticFailure({
            error,
          });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private backend: SetStatisticDataService,
    private sessionItemsStatisticsState: SessionItemStatisticsFacade
  ) {}
}
