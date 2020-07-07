import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromProgramStatistics from './program-statistics.reducer';
import * as ProgramStatisticsActions from './program-statistics.actions';
import { programStatisticMock } from '@bod/models';

@Injectable()
export class ProgramStatisticsEffects {
  loadProgramStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramStatisticsActions.loadProgramStatistics),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ProgramStatisticsActions.loadProgramStatisticsSuccess({
            programStatistics: [programStatisticMock],
          });
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

  constructor(private actions$: Actions) {}
}
