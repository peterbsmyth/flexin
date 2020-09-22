import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate, optimisticUpdate } from '@nrwl/angular';
import { WeekStatisticsActions } from './actions';
import { map, mapTo } from 'rxjs/operators';
import { WeekStatisticDataService } from '../../infrastructure/week-statistic.data.service';

@Injectable()
export class WeekStatisticsEffects {
  loadWeekStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeekStatisticsActions.loadWeekStatistics),
      fetch({
        run: () => {
          return this.backend.getAll().pipe(
            map((weekStatistics) =>
              WeekStatisticsActions.loadWeekStatisticsSuccess({
                weekStatistics,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return WeekStatisticsActions.loadWeekStatisticsFailure({
            error,
          });
        },
      })
    )
  );

  loadWeekStatisticByWeek$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeekStatisticsActions.loadWeekStatisticByWeek),
      fetch({
        run: (action) => {
          return this.backend.getOneByWeek(action.id).pipe(
            map((weekStatistic) =>
              WeekStatisticsActions.loadWeekStatisticByWeekSuccess({
                weekStatistic,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          if (error.error.error.statusCode === 404) {
            return WeekStatisticsActions.saveWeekStatisticByWeek(action);
          } else {
            return WeekStatisticsActions.loadWeekStatisticByWeekFailure({
              error,
            });
          }
        },
      })
    )
  );

  saveWeekStatisticByWeek$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeekStatisticsActions.saveWeekStatisticByWeek),
      fetch({
        run: (action) => {
          return this.backend.postOneByWeek(action.id).pipe(
            map((weekStatistic) =>
              WeekStatisticsActions.saveWeekStatisticByWeekSuccess({
                weekStatistic,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return WeekStatisticsActions.saveWeekStatisticByWeekFailure({
            error,
          });
        },
      })
    )
  );

  saveWeekStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeekStatisticsActions.saveWeekStatistic),
      fetch({
        run: (action) => {
          return this.backend.postOne(action.weekStatistic).pipe(
            map((weekStatistic) =>
              WeekStatisticsActions.saveWeekStatisticSuccess({
                weekStatistic,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return WeekStatisticsActions.saveWeekStatisticFailure({
            error,
          });
        },
      })
    )
  );

  updateWeekStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeekStatisticsActions.updateWeekStatistic),
      optimisticUpdate({
        run: (action) => {
          return this.backend
            .putOne(action.weekStatistic)
            .pipe(mapTo(WeekStatisticsActions.updateWeekStatisticSuccess()));
        },
        undoAction: (action, error) => {
          console.error('Error', error);
          return WeekStatisticsActions.updateWeekStatisticFailure({
            error,
          });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private backend: WeekStatisticDataService
  ) {}
}
