import { createSelector } from '@ngrx/store';
import { trainingSelector } from '../selector';
import { exercisesAdapter, ExercisesState } from './exercises.reducer';

export const getExercisesState = createSelector(
  trainingSelector,
  (state) => state.exercises
);

const { selectAll, selectEntities } = exercisesAdapter.getSelectors();

export const getExercisesLoaded = createSelector(
  getExercisesState,
  (state: ExercisesState) => state.loaded
);

export const getExercisesError = createSelector(
  getExercisesState,
  (state: ExercisesState) => state.error
);

export const getAllExercises = createSelector(
  getExercisesState,
  (state: ExercisesState) => selectAll(state)
);

export const getAllExercisesWithOneIntensity = createSelector(
  getExercisesState,
  (state: ExercisesState) => selectAll(state).filter((e) => e.intensities)
);

export const getExercisesEntities = createSelector(
  getExercisesState,
  (state: ExercisesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getExercisesState,
  (state: ExercisesState) => state.selectedId
);

export const getSelected = createSelector(
  getExercisesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getSelectedWithSortedIntensities = createSelector(
  getSelected,
  (exercise) => {
    const intensities = exercise?.intensities
      ?.slice(0)
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => a.order - b.order);

    return intensities
      ? {
          ...exercise,
          intensities,
        }
      : exercise;
  }
);
