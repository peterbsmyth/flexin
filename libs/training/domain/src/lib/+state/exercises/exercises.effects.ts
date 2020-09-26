import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { ExercisesActions } from './actions';
import { ExerciseDataService } from '../../infrastructure/exercise.data.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ExercisesEffects {
  loadExercises$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesActions.loadExercise),
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

  constructor(
    private actions$: Actions,
    private exerciseService: ExerciseDataService
  ) {}
}
