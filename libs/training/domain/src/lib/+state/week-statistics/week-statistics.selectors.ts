import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WEEKSTATISTICS_FEATURE_KEY,
  WeekStatisticsState,
  weekStatisticsAdapter,
} from './week-statistics.reducer';
import { PartialState } from '../root.reducer';
import { getSessionStatisticsEntities } from '../session-statistics/session-statistics.selectors';
import { getSessionItemStatisticsEntities } from '../session-item-statistics/session-item-statistics.selectors';
import { getExercisesEntities } from '../exercises/exercises.selectors';
import { getProgramsEntities } from '../weeks/weeks.selectors';

// Lookup the 'WeekStatistics' feature state managed by NgRx
export const getWeekStatisticsState = createFeatureSelector<
  PartialState,
  WeekStatisticsState
>(WEEKSTATISTICS_FEATURE_KEY);

const { selectAll, selectEntities } = weekStatisticsAdapter.getSelectors();

export const getWeekStatisticsLoaded = createSelector(
  getWeekStatisticsState,
  (state: WeekStatisticsState) => state.loaded
);

export const getWeekStatisticsRelationsLoaded = createSelector(
  getWeekStatisticsState,
  (state: WeekStatisticsState) => state.relationsLoaded
);

export const getWeekStatisticsError = createSelector(
  getWeekStatisticsState,
  (state: WeekStatisticsState) => state.error
);

export const getAllWeekStatistics = createSelector(
  getWeekStatisticsState,
  (state: WeekStatisticsState) => selectAll(state)
);

export const getWeekStatisticsEntities = createSelector(
  getWeekStatisticsState,
  (state: WeekStatisticsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getWeekStatisticsState,
  (state: WeekStatisticsState) => state.selectedId
);

export const getSelected = createSelector(
  getWeekStatisticsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getSelectedWithRelations = createSelector(
  getSelected,
  getSessionStatisticsEntities,
  getSessionItemStatisticsEntities,
  getExercisesEntities,
  getProgramsEntities,
  (
    weekStatistic,
    sessionStatisticEntities,
    sessionItemStatisticsEntities,
    exercisesEntities,
    programsEntities
  ) => {
    if (
      weekStatistic &&
      sessionStatisticEntities &&
      Object.keys(sessionItemStatisticsEntities).length
    ) {
      return {
        ...weekStatistic,
        week: {
          ...weekStatistic.week,
          program: programsEntities[weekStatistic.week.programId],
        },
        sessionStatistics: weekStatistic.sessionStatistics
          .map(({ id }) => sessionStatisticEntities[id])
          .filter((s) => s)
          .map((sessionStatistic) => ({
            ...sessionStatistic,
            sessionItemStatistics: sessionStatistic.sessionItemStatistics.map(
              ({ id }) => {
                const sessionItemStatistic = sessionItemStatisticsEntities[id];
                return {
                  ...sessionItemStatistic,
                  sessionItem: {
                    ...sessionItemStatistic.sessionItem,
                    exercise:
                      exercisesEntities[
                        sessionItemStatistic.sessionItem.exerciseId
                      ],
                  },
                };
              }
            ),
          })),
      };
    } else {
      return null;
    }
  }
);
