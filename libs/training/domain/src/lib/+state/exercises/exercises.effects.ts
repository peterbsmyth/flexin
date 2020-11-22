import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';

import * as fromExercises from './exercises.reducer';
import * as ExercisesActions from './exercises.actions';
import { mockExercises } from '@bod/shared/models';
import { ExercisesDataService } from '../../infrastructure/exercises.data.service';
import { mapTo } from 'rxjs/operators';

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
          return this.backend
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

  constructor(
    private actions$: Actions,
    private backend: ExercisesDataService
  ) {}
}
