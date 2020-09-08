import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { ExercisesApiActions } from './actions';
import { ExerciseDataService } from '../../infrastructure/exercise.data.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ExercisesEffects {
  loadExercises$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesApiActions.loadExercises),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ExercisesApiActions.loadExercisesSuccess({ exercises: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ExercisesApiActions.loadExercisesFailure({ error });
        },
      })
    )
  );

  saveExercise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesApiActions.saveExercise),
      optimisticUpdate({
        // provides an action
        run: (action) => {
          return this.exerciseService
            .saveOne(action.exercise)
            .pipe(
              map((exercise) =>
                ExercisesApiActions.saveExerciseSuccess({ exercise })
              )
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
    private exerciseService: ExerciseDataService
  ) {}
}
