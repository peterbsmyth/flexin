import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';

import * as fromV2Exercises from './v2-exercises.reducer';
import * as V2ExercisesActions from './v2-exercises.actions';
import { mockExercises } from '@bod/shared/models';
import { ExerciseV2sDataService } from '../../infrastructure/v2-exercises.data.service';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class V2ExercisesEffects {
  loadV2Exercise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(V2ExercisesActions.loadExerciseFromGuard),
      fetch({
        run: ({ id }) => {
          return V2ExercisesActions.loadExerciseSuccess({
            exercise: mockExercises.find((e) => e.id === id),
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return V2ExercisesActions.loadExerciseFailure({ error });
        },
      })
    )
  );

  loadV2Exercises$ = createEffect(() =>
    this.actions$.pipe(
      ofType(V2ExercisesActions.loadV2Exercises),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return V2ExercisesActions.loadV2ExercisesSuccess({
            v2Exercises: mockExercises,
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return V2ExercisesActions.loadV2ExercisesFailure({ error });
        },
      })
    )
  );

  updateExercise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(V2ExercisesActions.updateExercise),
      optimisticUpdate({
        run: (action) => {
          return this.backend
            .patchOne(action.exercise)
            .pipe(mapTo(V2ExercisesActions.updateExerciseSuccess()));
        },
        undoAction: (action, error) => {
          console.error('Error', error);
          return V2ExercisesActions.updateExerciseFailure({
            error,
          });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private backend: ExerciseV2sDataService
  ) {}
}
