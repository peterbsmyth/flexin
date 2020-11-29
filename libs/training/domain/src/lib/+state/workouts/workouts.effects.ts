import { Injectable } from '@angular/core';
import { mockWorkouts } from '@bod/shared/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { WorkoutsDataService } from '../../infrastructure/workouts.data.service';
import { getSelected as getSelectedProgram } from '../programs/programs.selectors';
import { TrainingState } from '../state';
import * as WorkoutsActions from './workouts.actions';

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
      //           ProgramsActions.loadWorkoutSuccess({ workout })
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

  updateWorkoutAndFutureWorkouts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutsActions.updateWorkoutAndFutureWorkoutsFromWorkoutPage),
      concatMap((action) =>
        of(action).pipe(withLatestFrom(this.store.select(getSelectedProgram)))
      ),
      switchMap(([{ workout }, program]) => {
        const futureWorkouts = program.workouts.filter(
          (w) =>
            w.order === workout.order &&
            w.day === workout.day &&
            w.week > workout.week
        );

        return this.backend
          .patchMany([workout, ...futureWorkouts])
          .pipe(
            map(() => WorkoutsActions.updateWorkoutAndFutureWorkoutsSuccess())
          );
      })
      // fetch({
      //   // provides an action
      //   run: ({ id }) => {
      //     return this.backend
      //       .getOne(id)
      //       .pipe(
      //         map((workout) =>
      //           ProgramsActions.loadWorkoutSuccess({ workout })
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
    private backend: WorkoutsDataService,
    private store: Store<TrainingState>
  ) {}
}
