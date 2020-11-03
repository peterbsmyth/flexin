import { WorkoutStatistic } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadWorkoutStatistics = createAction(
  '[WorkoutStatistics] Load WorkoutStatistics'
);

export const loadWorkoutStatisticsSuccess = createAction(
  '[WorkoutStatistics] Load WorkoutStatistics Success',
  props<{ workoutStatistics: WorkoutStatistic[] }>()
);

export const loadWorkoutStatisticsFailure = createAction(
  '[WorkoutStatistics] Load WorkoutStatistics Failure',
  props<{ error: any }>()
);
