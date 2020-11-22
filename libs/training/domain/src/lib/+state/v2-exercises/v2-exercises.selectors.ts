import { createSelector } from '@ngrx/store';
import { trainingSelector } from '../selector';
import { v2ExercisesAdapter, V2ExercisesState } from './v2-exercises.reducer';

export const getV2ExercisesState = createSelector(
  trainingSelector,
  (state) => state.v2Exercises
);

const { selectAll, selectEntities } = v2ExercisesAdapter.getSelectors();

export const getV2ExercisesLoaded = createSelector(
  getV2ExercisesState,
  (state: V2ExercisesState) => state.loaded
);

export const getV2ExercisesError = createSelector(
  getV2ExercisesState,
  (state: V2ExercisesState) => state.error
);

export const getAllV2Exercises = createSelector(
  getV2ExercisesState,
  (state: V2ExercisesState) => selectAll(state)
);

export const getV2ExercisesEntities = createSelector(
  getV2ExercisesState,
  (state: V2ExercisesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getV2ExercisesState,
  (state: V2ExercisesState) => state.selectedId
);

export const getSelected = createSelector(
  getV2ExercisesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
