import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WORKOUTS_FEATURE_KEY,
  WorkoutsState,
  workoutsAdapter,
} from './workouts.reducer';
import { PartialState } from '../root.reducer';

// Lookup the 'Workouts' feature state managed by NgRx
export const getWorkoutsState = createFeatureSelector<
  PartialState,
  WorkoutsState
>(WORKOUTS_FEATURE_KEY);

const { selectAll, selectEntities } = workoutsAdapter.getSelectors();

export const getWorkoutsLoaded = createSelector(
  getWorkoutsState,
  (state: WorkoutsState) => state.loaded
);

export const getWorkoutsError = createSelector(
  getWorkoutsState,
  (state: WorkoutsState) => state.error
);

export const getAllWorkouts = createSelector(
  getWorkoutsState,
  (state: WorkoutsState) => selectAll(state)
);

export const getWorkoutsEntities = createSelector(
  getWorkoutsState,
  (state: WorkoutsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getWorkoutsState,
  (state: WorkoutsState) => state.selectedId
);

export const getSelected = createSelector(
  getWorkoutsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
