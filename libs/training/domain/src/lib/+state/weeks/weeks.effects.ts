import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import {
  WeeksPageActions,
}from './actions';
import {
  SessionsApiActions
} from '../sessions/actions';
import { WeekDataService } from '../../infrastructure/week.data.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class WeeksEffects {
  loadWeekPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeeksPageActions.loadWeek),
      fetch({
        run: ({ id }) => {
          return this.weekService.getOne(id).pipe(
            mergeMap((week) => {
              return [
                WeeksPageActions.loadWeekSuccess({ week }),
                /**
                 * dispatch actions to load sessions attached to the week
                 */
                ...week.sessions.map((session: any) =>
                SessionsApiActions.loadSession({ id: session })
                ),
              ];
            })
          );
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
