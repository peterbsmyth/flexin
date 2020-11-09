import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as WorkoutsActions from './workouts.actions';
import { Workout } from '@bod/shared/models';

export const WORKOUTS_FEATURE_KEY = 'workouts';

export interface WorkoutsState extends EntityState<Workout> {
  selectedId?: string | number; // which Workouts record has been selected
  loaded: boolean; // has the Workouts list been loaded
  error?: string | null; // last known error (if any)
}

export const workoutsAdapter: EntityAdapter<Workout> = createEntityAdapter<
  Workout
>();

export const initialState: WorkoutsState = workoutsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const workoutsReducer = createReducer(
  initialState,
  on(WorkoutsActions.loadWorkouts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(WorkoutsActions.loadWorkoutSuccess, (state, { workout }) =>
    workoutsAdapter.upsertOne(workout, { ...state, loaded: true })
  ),
  on(WorkoutsActions.loadWorkoutsSuccess, (state, { workouts }) =>
    workoutsAdapter.setAll(workouts, { ...state, loaded: true })
  ),
  on(WorkoutsActions.loadWorkoutsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(WorkoutsActions.selectWorkoutFromGuard, (state, { id }) => ({
    ...state,
    selectedId: id,
  }))
);

export function reducer(state: WorkoutsState | undefined, action: Action) {
  return workoutsReducer(state, action);
}
