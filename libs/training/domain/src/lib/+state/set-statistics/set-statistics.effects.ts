import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { SetStatisticsActions } from './actions';
import { map, mapTo, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SetStatisticDataService } from '../../infrastructure/set-statistic.data.service';
import { PartialState } from '../root.reducer';
import { Store } from '@ngrx/store';
import { uniqBy } from 'lodash-es';
import { SessionItemStatisticDataService } from '../../infrastructure/session-item-statistic.data.service';
import { forkJoin } from 'rxjs';
import { SessionItemStatisticsActions } from '../session-item-statistics/actions';
import { SessionItemsActions } from '../session-items/actions';
import { ExerciseDataService } from '../../infrastructure/exercise.data.service';
import { ExercisesActions } from '../exercises/actions';
import { SessionItemDataService } from '../../infrastructure/session-item.data.service';

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
              SetStatisticsActions.loadSetStatisticsBySessionItemStatisticSuccess(
                {
                  setStatistics,
                }
              )
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SetStatisticsActions.loadSetStatisticsBySessionItemStatisticFailure(
            {
              error,
            }
          );
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

  loadWithAscendants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetStatisticsActions.loadSetStatisticsWithAscendants),
      fetch({
        run: (action) => {
          return this.backend.getAll().pipe(
            switchMap((setStatistics) => {
              this.store.dispatch(
                SetStatisticsActions.loadSetStatisticsSuccess({
                  setStatistics,
                })
              );
              const uniqueSessionItemStatisticsIds: number[] = uniqBy(
                setStatistics,
                'sessionItemStatisticId'
              ).map((statistic) => statistic.sessionItemStatisticId);
              return forkJoin(
                uniqueSessionItemStatisticsIds.map((id) =>
                  this.sessionItemsStatisticsService.getOne(id)
                )
              );
            }),
            switchMap((sessionItemStatistics) => {
              this.store.dispatch(
                SessionItemStatisticsActions.loadSessionItemStatisticsSuccess({
                  sessionItemStatistics,
                })
              );
              const sessionItems = sessionItemStatistics.map(
                (s) => s.sessionItem
              );

              return forkJoin(
                sessionItems.map(({ id }) =>
                  this.sessionItemsService.getOne(id)
                )
              );
            }),
            mergeMap((sessionItems) => {
              this.store.dispatch(
                SessionItemsActions.loadSessionItemsSuccess({
                  sessionItems,
                })
              );
              const exercises = sessionItems.map((s) => s.exercise);

              return [
                ExercisesActions.loadExercisesSuccess({ exercises }),
                SetStatisticsActions.loadSetStatisticsWithAscendantsSuccess(),
              ];
            })
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

  constructor(
    private actions$: Actions,
    private store: Store<PartialState>,
    private backend: SetStatisticDataService,
    private sessionItemsStatisticsService: SessionItemStatisticDataService,
    private sessionItemsService: SessionItemDataService,
    private exercisesService: ExerciseDataService
  ) {}
}
