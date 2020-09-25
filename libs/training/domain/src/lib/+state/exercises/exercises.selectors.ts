import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EXERCISES_FEATURE_KEY,
  ExercisesState,
  exercisesAdapter,
} from './exercises.reducer';
import { PartialState } from '../root.reducer';
import { SessionItemStatistic, SetStatistic } from '@bod/shared/models';
import { getAllSessionItemStatistics } from '../session-item-statistics/session-item-statistics.selectors';
import { getAllSetStatistics } from '../set-statistics/set-statistics.selectors';

// Lookup the 'Exercises' feature state managed by NgRx
export const getExercisesState = createFeatureSelector<
  PartialState,
  ExercisesState
>(EXERCISES_FEATURE_KEY);

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

export const getSetStatistics = createSelector(
  getSelected,
  getAllSessionItemStatistics,
  getAllSetStatistics,
  (exercise, sessionItemStatistics, setStatistics) => {
    const sessionItemStatisticIds = sessionItemStatistics
      .filter(
        (stat) => stat.sessionItem.exerciseId === (exercise && exercise.id)
      )
      .map((stat) => stat.id);

    return setStatistics.filter((stat) =>
      sessionItemStatisticIds.includes(stat.sessionItemStatisticId)
    );
  }
);
