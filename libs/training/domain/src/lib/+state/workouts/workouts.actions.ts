import { Workout } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadWorkouts = createAction('[Workouts] Load Workouts');

export const loadWorkoutsSuccess = createAction(
  '[Workouts] Load Workouts Success',
  props<{ workouts: Workout[] }>()
);

export const loadWorkoutsFailure = createAction(
  '[Workouts] Load Workouts Failure',
  props<{ error: string }>()
);

export const getWorkoutsWhereExerciseId = createAction(
  '[Workouts] Get Where ExerciseId',
  props<{ exerciseId: number }>()
);

export const loadWorkoutSuccess = createAction(
  '[Workouts] Load Workout Success',
  props<{ workout: Workout }>()
);

export const loadWorkoutFailure = createAction(
  '[Workouts] Load Workout Failure',
  props<{ error: string }>()
);

export const updateWorkoutFromWorkoutPage = createAction(
  '[Workouts][Workout Page] Update Workout',
  props<{ workout: Workout }>()
);

export const updateWorkoutAndFutureWorkoutsFromWorkoutPage = createAction(
  '[Workouts][Workout Page] Update Workout And Future Workouts',
  props<{ workout: Workout }>()
);

export const updateWorkoutAndFutureWorkoutsSuccess = createAction(
  '[Workouts] Update Workout And Future Workouts Success'
);

export const updateWorkout = createAction(
  '[Workouts] Update Workout',
  props<{ workout: Partial<Workout> }>()
);

export const updateWorkoutSuccess = createAction(
  '[Workouts] Update Workout Success'
);

export const updateWorkoutFailure = createAction(
  '[Workouts] Update Workout Failure',
  props<{ error: string }>()
);
