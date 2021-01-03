import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { SetStatisticsDataService } from '../../infrastructure/set-statistics.data.service';
import * as SetStatisticsActions from './set-statistics.actions';

@Injectable()
export class SetStatisticsEffects {
  loadSetStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetStatisticsActions.loadSetStatistics),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return SetStatisticsActions.loadSetStatisticsSuccess({
            setStatistics: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SetStatisticsActions.loadSetStatisticsFailure({ error });
        },
      })
    )
  );

  updateSetStatistic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetStatisticsActions.updateSetStatistic),
      fetch({
        run: (action) => {
          return this.backend.patchOne(action.setStatistic).pipe(
            map(() =>
              SetStatisticsActions.updateSetStatisticSuccess({
                setStatistic: action.setStatistic,
              })
            )
          );
          // Your custom service 'load' logic goes here. For now just return a success action...
          return SetStatisticsActions.loadSetStatisticsSuccess({
            setStatistics: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SetStatisticsActions.loadSetStatisticsFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private backend: SetStatisticsDataService
  ) {}
}
