import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, navigation } from '@nrwl/angular';

import * as fromSessions from './sessions.reducer';
import * as SessionsActions from './sessions.actions';
import { SessionsPage } from '../pages/sessions/sessions.page';
import { map } from 'rxjs/operators';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SessionService } from '@bod/data';
import { SessionPage } from '../pages/session/session.page';

@Injectable()
export class SessionsEffects {
  loadSessionsPage$ = createEffect(() =>
    this.actions$.pipe(
      // listens for the routerNavigation action from @ngrx/router-store
      navigation(SessionsPage, {
        run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
          return this.sessionService
            .getAll()
            .pipe(
              map((sessions) =>
                SessionsActions.loadSessionsSuccess({ sessions })
              )
            );
        },
        onError: (
          activatedRouteSnapshot: ActivatedRouteSnapshot,
          error: any
        ) => {
          // we can log and error here and return null
          // we can also navigate back
          return null;
        },
      })
    )
  );

  loadSessionPage$ = createEffect(() =>
    this.actions$.pipe(
      // listens for the routerNavigation action from @ngrx/router-store
      navigation(SessionPage, {
        run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
          return this.sessionService
            .getOne(activatedRouteSnapshot.params['sessionId'])
            .pipe(
              map((session) => SessionsActions.loadSessionPageSuccess({ session }))
            );
        },
        onError: (
          activatedRouteSnapshot: ActivatedRouteSnapshot,
          error: any
        ) => {
          // we can log and error here and return null
          // we can also navigate back
          return null;
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

  constructor(
    private actions$: Actions,
    private sessionService: SessionService
  ) {}
}
