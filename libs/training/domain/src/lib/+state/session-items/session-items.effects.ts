import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { SessionItemsActions } from './actions';
import { SessionItemDataService } from '../../infrastructure/session-item.data.service';
import { map, mapTo, mergeMap } from 'rxjs/operators';
import { ExercisesActions } from '../exercises/actions';

@Injectable()
export class SessionItemsEffects {
  loadSessionItemsBySessionPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemsActions.loadSessionItemsBySession),
      fetch({
        run: ({ id }) => {
          return this.sessionItemService.getAllBySession(id).pipe(
            map((sessionItems) =>
              SessionItemsActions.loadSessionItemsBySessionSuccess({
                sessionItems,
              })
            )
          );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemsActions.loadSessionItemsBySessionFailure({
            error,
          });
        },
      })
    )
  );

  loadSessionItemPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SessionItemsActions.loadSessionItem,
        SessionItemsActions.loadSessionItemFromGuard
      ),
      fetch({
        run: ({ id }) => {
          return this.sessionItemService.getOne(id).pipe(
            mergeMap((sessionItem) => [
              SessionItemsActions.loadSessionItemSuccess({
                sessionItem,
              }),
              ExercisesActions.loadExerciseSuccess({
                exercise: sessionItem.exercise,
              }),
            ])
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemsActions.loadSessionItemFailure({ error });
        },
      })
    )
  );

  updateSessionItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SessionItemsActions.updateSessionItemFromCreateProgramSessionItemPage
      ),
      optimisticUpdate({
        run: (action) => {
          return this.sessionItemService
            .patchOne(action.sessionItem)
            .pipe(mapTo(SessionItemsActions.updateSessionItemSuccess()));
        },
        undoAction: (action, error) => {
          console.error('Error', error);
          return SessionItemsActions.updateSessionItemFailure({
            error,
          });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sessionItemService: SessionItemDataService
  ) {}
}
