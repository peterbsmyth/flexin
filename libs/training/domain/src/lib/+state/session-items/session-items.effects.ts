import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { SessionItemsActions } from './actions';
import { SessionItemDataService } from '../../infrastructure/session-item.data.service';
import { map } from 'rxjs/operators';

@Injectable()
export class SessionItemsEffects {
  loadSessionItemsBySessionPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemsActions.loadSessionItemsBySession),
      fetch({
        run: ({ id }) => {
          return this.sessionItemService
            .getAllBySession(id)
            .pipe(
              map((sessionItems) =>
              SessionItemsActions.loadSessionItemsBySessionSuccess({ sessionItems })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemsActions.loadSessionItemsBySessionFailure({ error });
        },
      })
    )
  );

  loadSessionItemPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemsActions.loadSessionItem),
      fetch({
        run: ({ id }) => {
          return this.sessionItemService
            .getOne(id)
            .pipe(
              map((sessionItem) =>
                SessionItemsActions.loadSessionItemSuccess({ sessionItem })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemsActions.loadSessionItemFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sessionItemService: SessionItemDataService
  ) {}
}
