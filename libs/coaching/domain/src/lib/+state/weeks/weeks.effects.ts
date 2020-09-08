import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import { WeeksPageActions } from './actions';
import { WeekDataService } from '../../infrastructure/week.data.service';
import { map } from 'rxjs/operators';

@Injectable()
export class WeeksEffects {
  loadSessionsByWeekPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeeksPageActions.loadWeeksByProgram),
      fetch({
        run: ({ id }) => {
          return this.weekService
            .getAllByProgram(id)
            .pipe(
              map((weeks) =>
                WeeksPageActions.loadWeeksByProgramSuccess({ weeks })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return WeeksPageActions.loadWeeksByProgramFailure({ error });
        },
      })
    )
  );

  loadWeekPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeeksPageActions.loadWeek),
      fetch({
        run: ({ id }) => {
          return this.weekService
            .getOne(id)
            .pipe(map((week) => WeeksPageActions.loadWeekSuccess({ week })));
        },
        onError: (action, error) => {
          console.error('Error', error);
          return WeeksPageActions.loadWeekFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private weekService: WeekDataService
  ) {}
}
