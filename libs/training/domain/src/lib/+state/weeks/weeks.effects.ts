import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromWeeks from './weeks.reducer';
import * as WeeksActions from './weeks.actions';
import * as SessionsActions from '../sessions/sessions.actions';
import { WeekDataService } from '../../infrastructure/week.data.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class WeeksEffects {
  loadWeeks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeeksActions.loadWeeks),
      fetch({
        run: () => {
          return this.weekService
            .getAll()
            .pipe(map((weeks) => WeeksActions.loadWeeksSuccess({ weeks })));
        },
        onError: (action, error) => {
          console.error('Error', error);
          return WeeksActions.loadWeeksFailure({ error });
        },
      })
    )
  );

  guardWeeks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeeksActions.guardWeek),
      fetch({
        run: ({ id }) => {
          return this.weekService
            .getAll()
            .pipe(map((weeks) => WeeksActions.loadWeeksSuccess({ weeks })));
        },
        onError: (action, error) => {
          console.error('Error', error);
          return WeeksActions.loadWeeksFailure({ error });
        },
      })
    )
  );

  loadSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeeksActions.loadWeek),
      fetch({
        run: ({ id }) => {
          return this.weekService.getOne(id).pipe(
            mergeMap((week) => {
              return [
                WeeksActions.loadWeekSuccess({ week }),
                /**
                 * dispatch actions to load sessions attached to the week
                 */
                ...week.sessions.map((session: any) =>
                  SessionsActions.loadSession({ id: session })
                ),
              ];
            })
          );
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
