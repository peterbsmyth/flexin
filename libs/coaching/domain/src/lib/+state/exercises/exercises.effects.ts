import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import  { ExercisesApiActions } from './actions';

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

  constructor(private actions$: Actions) {}
}
