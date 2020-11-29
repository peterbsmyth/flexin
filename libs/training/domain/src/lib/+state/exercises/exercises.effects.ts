import { Injectable } from '@angular/core';
import { mockExercises } from '@bod/shared/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { ExercisesDataService } from '../../infrastructure/exercises.data.service';
import * as ExercisesActions from './exercises.actions';

@Injectable()
export class ExercisesEffects {
  loadExercise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesActions.loadExerciseFromGuard),
      fetch({
        run: ({ id }) => {
          return ExercisesActions.loadExerciseSuccess({
            exercise: mockExercises.find((e) => e.id === id),
          });
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
      ofType(ExercisesActions.loadExercises),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ExercisesActions.loadExercisesSuccess({
            exercises: mockExercises,
          });
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
      ofType(ExercisesActions.updateExercise),
      optimisticUpdate({
        run: (action) => {
          return ExercisesActions.updateExerciseSuccess();
          // return this.backend
          //   .patchOne(action.exercise)
          //   .pipe(mapTo(ExercisesActions.updateExerciseSuccess()));
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

  constructor(
    private actions$: Actions,
    private backend: ExercisesDataService
  ) {}
}
