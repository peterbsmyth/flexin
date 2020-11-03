import { Workout } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadWorkouts = createAction('[Workouts] Load Workouts');

export const loadWorkoutsSuccess = createAction(
  '[Workouts] Load Workouts Success',
  props<{ workouts: Workout[] }>()
);

export const loadWorkoutsFailure = createAction(
  '[Workouts] Load Workouts Failure',
  props<{ error: any }>()
);
