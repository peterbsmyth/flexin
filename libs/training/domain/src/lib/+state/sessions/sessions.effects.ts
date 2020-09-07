import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import { SessionsPageActions, SessionsApiActions } from './actions';
import { SessionItemsApiActions } from '../session-items/actions';
import { map, mergeMap } from 'rxjs/operators';
import { SessionDataService } from '../../infrastructure/session.data.service';

@Injectable()
export class SessionsEffects {
  loadSessions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsPageActions.loadSessions),
      fetch({
        run: () => {
          return this.sessionService
            .getAll()
            .pipe(
              map((sessions) =>
                SessionsPageActions.loadSessionsSuccess({ sessions })
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

  loadSessionPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsPageActions.loadSession),
      fetch({
        run: ({ id }) => {
          return this.sessionService.getOne(id).pipe(
            mergeMap((session) => {
              return [
                SessionsPageActions.loadSessionSuccess({ session }),
                ...session.items.map((sessionItem) =>
                  SessionItemsApiActions.loadSessionItem({ id: sessionItem })
                ),
              ];
            })
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
          return SessionsPageActions.loadSessionFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sessionService: SessionDataService
  ) {}
}
