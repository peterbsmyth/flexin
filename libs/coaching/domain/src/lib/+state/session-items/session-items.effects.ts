import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { SessionItemsApiActions, SessionItemsPageActions } from './actions';
import { SessionItemDataService } from '../../infrastructure/session-item.data.service';
import { map, mergeMap, mapTo } from 'rxjs/operators';
import { ExercisesApiActions } from '../exercises/actions';

@Injectable()
export class SessionItemsEffects {
  loadSessionItemsBySessionPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemsPageActions.loadSessionItemsBySession),
      fetch({
        run: ({ id }) => {
          return this.sessionItemService
            .getAllBySession(id)
            .pipe(
              map((sessionItems) =>
                SessionItemsPageActions.loadSessionItemsBySessionSuccess({
                  sessionItems,
                })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemsPageActions.loadSessionItemsBySessionFailure({
            error,
          });
        },
      })
    )
  );

  loadSessionItemWithExercise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemsPageActions.loadSessionItemWithExercise),
      fetch({
        run: ({ id }) => {
          return this.sessionItemService
            .getOneWithExercise(id)
            .pipe(
              mergeMap((sessionItem) => [
                SessionItemsPageActions.loadSessionItemWithExerciseSuccess({ sessionItem }),
                ExercisesApiActions.loadExerciseSuccess({
                  exercise: sessionItem.exercise,
                }),
              ])
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemsPageActions.loadSessionItemWithExerciseFailure({ error });
        },
      })
    )
  );

  loadSessionItemPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemsPageActions.loadSessionItem),
      fetch({
        run: ({ id }) => {
          return this.sessionItemService
            .getOne(id)
            .pipe(
              map((sessionItem) =>
                SessionItemsPageActions.loadSessionItemSuccess({ sessionItem })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return SessionItemsPageActions.loadSessionItemFailure({ error });
        },
      })
    )
  );

  updateSessionItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionItemsPageActions.updateSessionItem),
      optimisticUpdate({
        run: (action) => {
          return this.sessionItemService
            .patchOne(action.sessionItem)
            .pipe(mapTo(SessionItemsPageActions.updateSessionItemSuccess()));
        },
        undoAction: (action, error) => {
          console.error('Error', error);
          return SessionItemsPageActions.updateSessionItemFailure({
            error,
          });
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
