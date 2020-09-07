import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { SessionItemsApiActions } from './actions';
import { SessionItemDataService } from '../../infrastructure/session-item.data.service';
import { map } from 'rxjs/operators';

@Injectable()
export class SessionItemsEffects {
  loadSessionItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemsApiActions.loadSessionItems),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return SessionItemsApiActions.loadSessionItemsSuccess({
            sessionItems: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemsApiActions.loadSessionItemsFailure({ error });
        },
      })
    )
  );

  loadSessionItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemsApiActions.loadSessionItem),
      fetch({
        run: ({ id }) => {
          return this.sessionItemService
            .getOne(id)
            .pipe(
              map((sessionItem) =>
                SessionItemsApiActions.loadSessionItemSuccess({ sessionItem })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemsApiActions.loadSessionItemFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sessionItemService: SessionItemDataService
  ) {}
}
