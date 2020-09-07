import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromSessions from './sessions.reducer';
import * as SessionsActions from './sessions.actions';
import { map } from 'rxjs/operators';
import { SessionDataService } from '../../infrastructure/session.data.service';

@Injectable()
export class SessionsEffects {
  loadSessions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsActions.loadSessions),
      fetch({
        run: () => {
          return this.sessionService
            .getAll()
            .pipe(
              map((sessions) =>
                SessionsActions.loadSessionsSuccess({ sessions })
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

  loadSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsActions.loadSession),
      fetch({
        run: ({ id }) => {
          return this.sessionService
            .getOne(id)
            .pipe(
              map((session) => SessionsActions.loadSessionSuccess({ session }))
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionsActions.loadSessionFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sessionService: SessionDataService
  ) {}
}
