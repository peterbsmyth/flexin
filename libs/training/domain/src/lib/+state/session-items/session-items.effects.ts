import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromSessionItems from './session-items.reducer';
import * as SessionItemsActions from './session-items.actions';

@Injectable()
export class SessionItemsEffects {
  loadSessionItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemsActions.loadSessionItems),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return SessionItemsActions.loadSessionItemsSuccess({
            sessionItems: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemsActions.loadSessionItemsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
