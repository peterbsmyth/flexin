import { createSelector } from '@ngrx/store';
import { trainingSelector } from '../selector';
import { workoutsAdapter, WorkoutsState } from './workouts.reducer';

// Lookup the 'Workouts' feature state managed by NgRx
export const getWorkoutsState = createSelector(
  trainingSelector,
  (state) => state.workouts
);

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
