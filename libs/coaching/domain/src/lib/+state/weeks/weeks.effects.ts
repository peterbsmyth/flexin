import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import { WeeksActions } from './actions';
import { WeekDataService } from '../../infrastructure/week.data.service';
import { map } from 'rxjs/operators';

@Injectable()
export class WeeksEffects {
  loadSessionsByWeekPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeeksActions.loadWeeksByProgram),
      fetch({
        run: ({ id }) => {
          return this.weekService
            .getAllByProgram(id)
            .pipe(
              map((weeks) =>
                WeeksActions.loadWeeksByProgramSuccess({ weeks })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return WeeksActions.loadWeeksByProgramFailure({ error });
        },
      })
    )
  );

  loadWeekPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeeksActions.loadWeek),
      fetch({
        run: ({ id }) => {
          return this.weekService
            .getOne(id)
            .pipe(map((week) => WeeksActions.loadWeekSuccess({ week })));
        },
        onError: (action, error) => {
          console.error('Error', error);
          return WeeksActions.loadWeekFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private weekService: WeekDataService
  ) {}
}
