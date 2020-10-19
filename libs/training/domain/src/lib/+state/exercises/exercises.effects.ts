import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { ExercisesActions } from './actions';
import { ExerciseDataService } from '../../infrastructure/exercise.data.service';
import { map, mapTo } from 'rxjs/operators';

@Injectable()
export class ExercisesEffects {
  loadExercise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ExercisesActions.loadExerciseFromInputFeatureSessionItemPage,
        ExercisesActions.loadExerciseFromGuard
      ),
      fetch({
        run: ({ id }) => {
          return this.exerciseService
            .getOne(id)
            .pipe(
              map((exercise) =>
                ExercisesActions.loadExerciseSuccess({ exercise })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ExercisesActions.loadExerciseFailure({ error });
        },
      })
    )
  );

  loadExercises$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ExercisesActions.loadExercisesFromPage,
        ExercisesActions.loadExercisesFromProgramBoardPage,
        ExercisesActions.loadExercisesFromSessionItemPage
      ),
      fetch({
        run: () => {
          return this.exerciseService
            .getAll()
            .pipe(
              map((exercises) =>
                ExercisesActions.loadExercisesSuccess({ exercises })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ExercisesActions.loadExercisesFailure({ error });
        },
      })
    )
  );

  updateExercise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ExercisesActions.updateExerciseFromPage,
        ExercisesActions.updateExerciseFromSessionPage
      ),
      optimisticUpdate({
        run: (action) => {
          return this.exerciseService
            .patchOne(action.exercise)
            .pipe(mapTo(ExercisesActions.updateExerciseSuccess()));
        },
        undoAction: (action, error) => {
          console.error('Error', error);
          return ExercisesActions.updateExerciseFailure({
            error,
          });
        },
      })
    )
  );

  saveExercise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesActions.saveExerciseFromPage),
      optimisticUpdate({
        // provides an action
        run: (action) => {
          return this.exerciseService
            .saveOne(action.exercise)
            .pipe(
              map((exercise) =>
                ExercisesActions.saveExerciseSuccess({ exercise })
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
