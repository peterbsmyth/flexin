import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, navigation } from '@nrwl/angular';

import * as fromSessions from './sessions.reducer';
import * as SessionsActions from './sessions.actions';
import { SessionsPage } from '../pages/sessions/sessions.page';
import { map } from 'rxjs/operators';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SessionService } from '@bod/data';

@Injectable()
export class SessionsEffects {
  loadPrograms$ =createEffect(() =>
  this.actions$.pipe(
    // listens for the routerNavigation action from @ngrx/router-store
    navigation(SessionsPage, {
      run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
        return this.sessionService.getAll()
          .pipe(
            map((sessions) => SessionsActions.loadSessionsSuccess({ sessions }))
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

  loadSessions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsActions.loadSessions),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return SessionsActions.loadSessionsSuccess({ sessions: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionsActions.loadSessionsFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sessionService: SessionService
  ) {}
}
