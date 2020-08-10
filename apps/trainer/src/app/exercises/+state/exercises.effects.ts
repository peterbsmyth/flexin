import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';

import * as fromExercises from './exercises.reducer';
import * as ExercisesActions from './exercises.actions';
import { ExerciseService } from '@bod/data';
import { map } from 'rxjs/operators';

@Injectable()
export class ExercisesEffects {
  loadExercises$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesActions.loadExercises),
      fetch({
        run: (action) => {
          return this.exercises$.getAll()
            .pipe(
              map(exercises => ExercisesActions.loadExercisesSuccess({ exercises }))
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ExercisesActions.loadExercisesFailure({ error });
        },
      })
    )
  );

  saveExercise$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ExercisesActions.saveExercise),
    optimisticUpdate({
      // provides an action
      run: (action) => {
        return this.exercises$.saveOne(action.exercise)
          .pipe(
            map(exercise => ExercisesActions.saveExerciseSuccess({ exercise }))
          );
      },
      undoAction: (action, error: any) => {
        // dispatch an undo action to undo the changes in the client state
        return {
          type: 'UNDO_TODO_UPDATE',
          todo: action.exercise,
        };
      },
    })
  )
);

  constructor(
    private actions$: Actions,
    private exercises$: ExerciseService
  ) {}
}
