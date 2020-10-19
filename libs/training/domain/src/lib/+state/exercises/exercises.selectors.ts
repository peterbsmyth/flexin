import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EXERCISES_FEATURE_KEY,
  ExercisesState,
  exercisesAdapter,
} from './exercises.reducer';
import { PartialState } from '../root.reducer';
import { getAllSessionItemStatistics } from '../session-item-statistics/session-item-statistics.selectors';
import { getAllSetStatistics } from '../set-statistics/set-statistics.selectors';
import { maxBy } from 'lodash-es';
import { SetStatistic } from '@bod/shared/models';
import {
  SessionItemsState,
  SESSIONITEMS_FEATURE_KEY,
} from '../session-items/session-items.reducer';

// Lookup the 'Session Items' feature state managed by NgRx
export const getSessionItemsState = createFeatureSelector<
  PartialState,
  SessionItemsState
>(SESSIONITEMS_FEATURE_KEY);

export const getSessionItemsEntities = createSelector(
  getSessionItemsState,
  (state: SessionItemsState) => state.entities
);

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
  getSessionItemsEntities,
  getAllSetStatistics,
  (exercise, sessionItemStatistics, sessionItemEntities, setStatistics) => {
    const sessionItemStatisticIds = sessionItemStatistics
      .filter((stat) => {
        return (
          sessionItemEntities[stat.sessionItemId].exerciseId === exercise?.id
        );
      })
      .map((stat) => stat.id);

    return setStatistics.filter((stat) =>
      sessionItemStatisticIds.includes(stat.sessionItemStatisticId)
    );
  }
);

export const getMaxReps = createSelector(getSetStatistics, (setStatistics) => {
  const data = setStatistics
    .filter((stat) => !!stat.reps)
    .map((stat) => stat.reps);
  if (data.length) {
    return Math.max.apply(null, data);
  } else {
    return 0;
  }
});

export const getBestSet = createSelector(getSetStatistics, (setStatistics) => {
  const maxWeight = Math.max.apply(
    null,
    setStatistics.map((stat) => stat.weight)
  );
  const topWeights = setStatistics.filter((s) => s.weight === maxWeight);
  const bestSet: SetStatistic = topWeights.length
    ? maxBy(topWeights, 'reps')
    : null;

  if (bestSet?.weight === 0) {
    return null;
  } else {
    return bestSet;
  }
});
