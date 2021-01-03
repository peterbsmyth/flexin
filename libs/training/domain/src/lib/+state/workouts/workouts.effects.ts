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
  getWorkoutWhereExerciseId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutsActions.getWorkoutsWhereExerciseId),
      fetch({
        run: ({ exerciseId }) => {
          return this.backend.getAllWhereExcerciseId(exerciseId).pipe(
            map((workouts) =>
              WorkoutsActions.loadWorkoutsSuccess({
                workouts,
              })
            )
          );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return WorkoutsActions.loadWorkoutsFailure({ error });
        },
      })
    )
  );

  loadWorkouts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutsActions.loadWorkouts),
      fetch({
        run: () => {
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
    )
  );

  updateWorkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutsActions.updateWorkoutFromWorkoutPage),
      switchMap(({ workout }) => {
        return this.backend
          .patchOne(workout)
          .pipe(map(() => WorkoutsActions.updateWorkoutSuccess()));
      })
    )
  );

  updatePartialWorkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkoutsActions.updateWorkout),
      switchMap(({ workout }) => {
        return this.backend
          .patchOne(workout)
          .pipe(map(() => WorkoutsActions.updateWorkoutSuccess()));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private backend: WorkoutsDataService,
    private store: Store<TrainingState>
  ) {}
}
