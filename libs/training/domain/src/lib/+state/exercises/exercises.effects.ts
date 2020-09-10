import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { ExercisesApiActions } from './actions';
import { ExerciseDataService } from '../../infrastructure/exercise.data.service';
import { map } from 'rxjs/operators';

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

  constructor(
    private actions$: Actions,
    private exerciseService: ExerciseDataService
  ) {}
}
