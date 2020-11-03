import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PartialState } from '../root.reducer';
import {
  V2EXERCISES_FEATURE_KEY,
  v2ExercisesAdapter,
  V2ExercisesState,
} from './v2-exercises.reducer';

// Lookup the 'V2Exercises' feature state managed by NgRx
export const getV2ExercisesState = createFeatureSelector<
  PartialState,
  V2ExercisesState
>(V2EXERCISES_FEATURE_KEY);

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
