import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';

import * as fromWorkouts from './workouts.reducer';
import * as WorkoutsActions from './workouts.actions';
import { mockWorkouts } from '@bod/shared/models';
import { map, mapTo } from 'rxjs/operators';
import { WorkoutsDataService } from '../../infrastructure/workouts.data.service';

@Injectable()
export class WorkoutsEffects {
  loadWorkouts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutsActions.loadWorkouts),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return WorkoutsActions.loadWorkoutsSuccess({
            workouts: mockWorkouts,
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return WorkoutsActions.loadWorkoutsFailure({ error });
        },
      })
    )
  );

  loadWorkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutsActions.loadWorkoutFromGuard),
      map(() =>
        WorkoutsActions.loadWorkoutSuccess({ workout: mockWorkouts[0] })
      )
      // fetch({
      //   // provides an action
      //   run: ({ id }) => {
      //     return this.backend
      //       .getOne(id)
      //       .pipe(
      //         map((workout) =>
      //           V2ProgramsActions.loadWorkoutSuccess({ workout })
      //         )
      //       );
      //   },
      //   onError: (action, error: any) => {
      //     // dispatch an undo action to undo the changes in the client state
      //     return null;
      //   },
      // })
    )
  );

  constructor(
    private actions$: Actions,
    private backend: WorkoutsDataService
  ) {}
}
