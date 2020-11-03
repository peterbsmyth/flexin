import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as WorkoutStatisticsActions from './workout-statistics.actions';
import { WorkoutStatistic } from '@bod/shared/models';

export const WORKOUTSTATISTICS_FEATURE_KEY = 'workoutStatistics';

export interface WorkoutStatisticsState extends EntityState<WorkoutStatistic> {
  selectedId?: string | number; // which WorkoutStatistics record has been selected
  loaded: boolean; // has the WorkoutStatistics list been loaded
  error?: string | null; // last known error (if any)
}

export const workoutStatisticsAdapter: EntityAdapter<WorkoutStatistic> = createEntityAdapter<
  WorkoutStatistic
>();

export const initialState: WorkoutStatisticsState = workoutStatisticsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const workoutStatisticsReducer = createReducer(
  initialState,
  on(WorkoutStatisticsActions.loadWorkoutStatistics, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    WorkoutStatisticsActions.loadWorkoutStatisticsSuccess,
    (state, { workoutStatistics }) =>
      workoutStatisticsAdapter.setAll(workoutStatistics, {
        ...state,
        loaded: true,
      })
  ),
  on(
    WorkoutStatisticsActions.loadWorkoutStatisticsFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function reducer(
  state: WorkoutStatisticsState | undefined,
  action: Action
) {
  return workoutStatisticsReducer(state, action);
}
