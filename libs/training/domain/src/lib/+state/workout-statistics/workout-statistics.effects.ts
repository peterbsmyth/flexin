import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromWorkoutStatistics from './workout-statistics.reducer';
import * as WorkoutStatisticsActions from './workout-statistics.actions';

@Injectable()
export class WorkoutStatisticsEffects {
  loadWorkoutStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutStatisticsActions.loadWorkoutStatistics),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return WorkoutStatisticsActions.loadWorkoutStatisticsSuccess({
            workoutStatistics: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return WorkoutStatisticsActions.loadWorkoutStatisticsFailure({
            error,
          });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
