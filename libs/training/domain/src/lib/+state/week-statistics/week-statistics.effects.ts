import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { WeekStatisticsActions } from './actions';
import * as ProgramStatisticsSelectors from '../program-statistics/program-statistics.selectors';
import {
  map,
  mapTo,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { WeekStatisticDataService } from '../../infrastructure/week-statistic.data.service';
import { Store } from '@ngrx/store';
import { PartialState } from '../root.reducer';
import { forkJoin, of, throwError } from 'rxjs';
import { SessionStatisticDataService } from '../../infrastructure/session-statistic.data.service';
import { SessionStatisticsActions } from '../session-statistics/actions';
import { flatten } from 'lodash-es';
import { SessionItemStatisticDataService } from '../../infrastructure/session-item-statistic.data.service';
import { SessionItemStatisticsActions } from '../session-item-statistics/actions';
import {
  Exercise,
  SessionItemStatistic,
  SetStatistic,
} from '@bod/shared/models';
import { SetStatisticsActions } from '../set-statistics/actions';
import { SetStatisticDataService } from '../../infrastructure/set-statistic.data.service';
import { ExerciseDataService } from '../../infrastructure/exercise.data.service';
import { ExercisesActions } from '../exercises/actions';

@Injectable()
export class WeekStatisticsEffects {
  loadDescendants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeekStatisticsActions.loadDescendants),
      fetch({
        run: ({ id }) => {
          return this.backend.getOne(id).pipe(
            switchMap((weekStatistic) => {
              const sessionStatistics = weekStatistic?.sessionStatistics;

              this.store.dispatch(
                WeekStatisticsActions.loadWeekStatisticSuccess({
                  weekStatistic,
                })
              );

              if (!sessionStatistics) {
                return throwError('no session statistics');
              }

              return forkJoin(
                sessionStatistics.map((sessionStatistic) =>
                  this.sessionStatisticService.getOne(sessionStatistic.id)
                )
              );
            }),
            switchMap((sessionStatistics) => {
              const sessionItemStatistics = sessionStatistics
                .map(
                  (sessionStatistic) => sessionStatistic.sessionItemStatistics
                )
                .flat();

              this.store.dispatch(
                SessionStatisticsActions.loadSessionStatisticsSuccess({
                  sessionStatistics,
                })
              );

              if (
                !sessionItemStatistics ||
                sessionItemStatistics.every(
                  (sessionItemStatistic) => !sessionItemStatistic
                )
              ) {
                return throwError('no session item statistics');
              }

              return forkJoin(
                sessionItemStatistics.map((sessionItemStatistic) =>
                  this.sessionItemStatisticService.getOne(
                    sessionItemStatistic.id
                  )
                )
              );
            }),
            switchMap((sessionItemStatistics) => {
              const allExerciseIds = sessionItemStatistics.map(
                (sessionItemStatistic) =>
                  sessionItemStatistic.sessionItem.exerciseId
              );
              const unqiueExerciseIds = [...new Set(allExerciseIds)];
              const setStatistics = sessionItemStatistics
                .map(
                  (sessionItemStatistic) => sessionItemStatistic.setStatistics
                )
                .flat();

              this.store.dispatch(
                SessionItemStatisticsActions.loadSessionItemStatisticsSuccess({
                  sessionItemStatistics,
                })
              );

              return forkJoin([
                ...setStatistics
                  .filter((setStatistic) => !!setStatistic)
                  .map((setStatistic) =>
                    this.setStatisticService.getOne(setStatistic.id)
                  ),
                ...unqiueExerciseIds.map((exerciseId) =>
                  this.exerciseService.getOne(exerciseId)
                ),
              ]);
            }),
            mergeMap((data: any) => {
              const setStatistics: SetStatistic[] = data.filter(
                (d: any) => !!d.set
              );
              const exercises: Exercise[] = data.filter((d: any) => !!!d.set);
              return [
                SetStatisticsActions.loadSetStatisticsSuccess({
                  setStatistics,
                }),
                ExercisesActions.loadExercisesSuccess({
                  exercises,
                }),
                WeekStatisticsActions.loadDescendantsSuccess(),
              ];
            })
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
          return this.backend.getOneByWeek(action.week.id).pipe(
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
      withLatestFrom(
        this.store.select(ProgramStatisticsSelectors.getAllProgramStatistics)
      ),
      switchMap(([action, programStatistics]) => {
        const programStatisticId = programStatistics.find(
          (programStatistic) =>
            programStatistic.programId === action.week.programId
        ).id;
        const draftWeekStatistic = {
          weekId: action.week.id,
          programStatisticId,
        };
        return this.backend.postOneByWeek(draftWeekStatistic).pipe(
          map((weekStatistic) =>
            WeekStatisticsActions.saveWeekStatisticByWeekSuccess({
              weekStatistic,
            })
          )
        );
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
    private store: Store<PartialState>,
    private backend: WeekStatisticDataService,
    private sessionStatisticService: SessionStatisticDataService,
    private sessionItemStatisticService: SessionItemStatisticDataService,
    private setStatisticService: SetStatisticDataService,
    private exerciseService: ExerciseDataService
  ) {}
}
