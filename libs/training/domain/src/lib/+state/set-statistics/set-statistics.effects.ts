import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate, optimisticUpdate } from '@nrwl/angular';
import { SetStatisticsActions } from './actions';
import { map, mapTo } from 'rxjs/operators';
import { SetStatisticDataService } from '../../infrastructure/set-statistic.data.service';

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
            .putOne(action.setStatistic)
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
    private backend: SetStatisticDataService
  ) {}
}
