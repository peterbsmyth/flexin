import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { ExercisesApiActions } from './actions';
import { ExerciseDataService } from '../../infrastructure/exercise.data.service';
import { map, mapTo } from 'rxjs/operators';

@Injectable()
export class ExercisesEffects {
  loadExercises$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesApiActions.loadExercises),
      fetch({
        run: () => {
          return this.exerciseService
            .getAll()
            .pipe(
              map((exercises) =>
                ExercisesApiActions.loadExercisesSuccess({ exercises })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ExercisesApiActions.loadExercisesFailure({ error });
        },
      })
    )
  );

  loadExercise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesApiActions.loadExercise),
      fetch({
        run: ({ id }) => {
          return this.exerciseService
            .getOne(id)
            .pipe(
              map((exercise) =>
                ExercisesApiActions.loadExerciseSuccess({ exercise })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ExercisesApiActions.loadExerciseFailure({ error });
        },
      })
    )
  );

  updateExercise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesApiActions.updateExercise),
      optimisticUpdate({
        run: (action) => {
          return this.exerciseService
            .patchOne(action.exercise)
            .pipe(mapTo(ExercisesApiActions.updateExerciseSuccess()));
        },
        undoAction: (action, error) => {
          console.error('Error', error);
          return ExercisesApiActions.updateExerciseFailure({
            error,
          });
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
