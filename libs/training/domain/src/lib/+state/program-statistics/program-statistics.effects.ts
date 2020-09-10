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
            .pipe(mapTo(ProgramStatisticsActions.updateProgramStatisticSuccess()));
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
