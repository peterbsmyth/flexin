import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromV2Exercises from './v2-exercises.reducer';
import * as V2ExercisesActions from './v2-exercises.actions';

@Injectable()
export class V2ExercisesEffects {
  loadV2Exercises$ = createEffect(() =>
    this.actions$.pipe(
      ofType(V2ExercisesActions.loadV2Exercises),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return V2ExercisesActions.loadV2ExercisesSuccess({ v2Exercises: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return V2ExercisesActions.loadV2ExercisesFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
