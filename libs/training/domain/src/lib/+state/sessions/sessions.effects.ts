import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import { SessionsPageActions, SessionsApiActions } from './actions';
import { map } from 'rxjs/operators';
import { SessionDataService } from '../../infrastructure/session.data.service';

@Injectable()
export class SessionsEffects {
  loadSessionsByWeekPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsPageActions.loadSessionsByWeek),
      fetch({
        run: ({ id }) => {
          return this.sessionService
            .getAllByWeek(id)
            .pipe(
              map((sessions) =>
                SessionsPageActions.loadSessionsByWeekSuccess({ sessions })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionsPageActions.loadSessionsByWeekFailure({ error });
        },
      })
    )
  );

  loadSessionPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsPageActions.loadSession),
      fetch({
        run: ({ id }) => {
          return this.sessionService
            .getOne(id)
            .pipe(
              map((session) =>
                SessionsPageActions.loadSessionSuccess({ session })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionsPageActions.loadSessionFailure({ error });
        },
      })
    )
  );

  loadSessionApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsApiActions.loadSession),
      fetch({
        run: ({ id }) => {
          return this.sessionService
            .getOne(id)
            .pipe(
              map((session) =>
                SessionsApiActions.loadSessionSuccess({ session })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionsApiActions.loadSessionFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sessionService: SessionDataService
  ) {}
}
