import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import { SessionsActions } from './actions';
import { map } from 'rxjs/operators';
import { SessionDataService } from '../../infrastructure/session.data.service';

@Injectable()
export class SessionsEffects {
  loadSessionsByWeekPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsActions.loadSessionsByWeek),
      fetch({
        run: ({ id }) => {
          return this.sessionService
            .getAllByWeek(id)
            .pipe(
              map((sessions) =>
                SessionsActions.loadSessionsByWeekSuccess({ sessions })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionsActions.loadSessionsByWeekFailure({ error });
        },
      })
    )
  );

  loadSessionPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsActions.loadSession),
      fetch({
        run: ({ id }) => {
          return this.sessionService
            .getOne(id)
            .pipe(
              map((session) =>
                SessionsActions.loadSessionSuccess({ session })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionsActions.loadSessionFailure({ error });
        },
      })
    )
  );

  loadSessionApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsActions.loadSessionApi),
      fetch({
        run: ({ id }) => {
          return this.sessionService
            .getOne(id)
            .pipe(
              map((session) =>
                SessionsActions.loadSessionApiSuccess({ session })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionsActions.loadSessionApiFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sessionService: SessionDataService
  ) {}
}
