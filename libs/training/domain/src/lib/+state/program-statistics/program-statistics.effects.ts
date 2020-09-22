import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate, optimisticUpdate } from '@nrwl/angular';
import { ProgramStatisticsActions } from './actions';
import { map, mapTo } from 'rxjs/operators';
import { ProgramStatisticDataService } from '../../infrastructure/program-statistic.data.service';

@Injectable()
export class ProgramStatisticsEffects {
  loadProgramStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramStatisticsActions.loadProgramStatistics),
      fetch({
        run: () => {
          return this.backend.getAll().pipe(
            map((programStatistics) =>
              ProgramStatisticsActions.loadProgramStatisticsSuccess({
                programStatistics,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ProgramStatisticsActions.loadProgramStatisticsFailure({
            error,
          });
        },
      })
    )
  );

  loadProgramStatisticByProgram$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramStatisticsActions.loadProgramStatisticByProgram),
      fetch({
        run: (action) => {
          return this.backend.getOneByProgram(action.id).pipe(
            map((programStatistic) =>
              ProgramStatisticsActions.loadProgramStatisticByProgramSuccess({
                programStatistic,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          if (error.error.error.statusCode === 404) {
            return ProgramStatisticsActions.saveProgramStatisticByProgram({
              id: action.id,
            });
          } else {
            return ProgramStatisticsActions.loadProgramStatisticByProgramFailure(
              {
                error,
              }
            );
          }
        },
      })
    )
  );

  saveProgramStatisticByProgram$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramStatisticsActions.saveProgramStatisticByProgram),
      fetch({
        run: (action) => {
          return this.backend.postOneByProgram(action.id).pipe(
            map((programStatistic) =>
              ProgramStatisticsActions.saveProgramStatisticByProgramSuccess({
                programStatistic,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ProgramStatisticsActions.saveProgramStatisticByProgramFailure({
            error,
          });
        },
      })
    )
  );

  saveProgramStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramStatisticsActions.saveProgramStatistic),
      fetch({
        run: (action) => {
          return this.backend.postOne(action.programStatistic).pipe(
            map((programStatistic) =>
              ProgramStatisticsActions.saveProgramStatisticSuccess({
                programStatistic,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ProgramStatisticsActions.saveProgramStatisticFailure({
            error,
          });
        },
      })
    )
  );

  updateProgramStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramStatisticsActions.updateProgramStatistic),
      optimisticUpdate({
        run: (action) => {
          return this.backend
            .putOne(action.programStatistic)
            .pipe(
              mapTo(ProgramStatisticsActions.updateProgramStatisticSuccess())
            );
        },
        undoAction: (action, error) => {
          console.error('Error', error);
          return ProgramStatisticsActions.updateProgramStatisticFailure({
            error,
          });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private backend: ProgramStatisticDataService
  ) {}
}
