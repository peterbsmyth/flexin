import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { WeekStatisticsActions } from './actions';
import { WeekStatistic } from '@bod/shared/models';

export const WEEKSTATISTICS_FEATURE_KEY = 'weekStatistics';

export interface WeekStatisticsState extends EntityState<WeekStatistic> {
  selectedId?: string | number; // which WeekStatistics record has been selected
  loaded: boolean; // has the WeekStatistics list been loaded
  relationsLoaded?: boolean; // has the WeekStatistics list been loaded
  error?: string | null; // last known error (if any)
}

export const weekStatisticsAdapter: EntityAdapter<WeekStatistic> = createEntityAdapter<
  WeekStatistic
>();

export const initialState: WeekStatisticsState = weekStatisticsAdapter.getInitialState(
  {
    // week initial required properties
    loaded: false,
  }
);

const weekStatisticsReducer = createReducer(
  initialState,
  on(WeekStatisticsActions.loadWeekStatistics, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    WeekStatisticsActions.loadWeekStatisticsSuccess,
    (state, { weekStatistics }) =>
      weekStatisticsAdapter.setAll(weekStatistics, {
        ...state,
        loaded: true,
      })
  ),
  on(
    WeekStatisticsActions.loadWeekStatisticSuccess,
    WeekStatisticsActions.loadWeekStatisticByWeekSuccess,
    WeekStatisticsActions.saveWeekStatisticByWeekSuccess,
    WeekStatisticsActions.saveWeekStatisticSuccess,
    WeekStatisticsActions.updateWeekStatistic,
    (state, { weekStatistic }) =>
      weekStatisticsAdapter.upsertOne(weekStatistic, {
        ...state,
        loaded: true,
      })
  ),
  on(WeekStatisticsActions.loadWeekStatisticsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(WeekStatisticsActions.loadWeekStatisticsFailureReset, (state) => ({
    ...state,
    error: '',
  })),
  on(WeekStatisticsActions.loadRelations, (state, { id }) => ({
    ...state,
    selectedId: id,
    relationsLoaded: false,
  })),
  on(WeekStatisticsActions.loadRelationsSuccess, (state) => ({
    ...state,
    relationsLoaded: true,
  }))
);

export function reducer(
  state: WeekStatisticsState | undefined,
  action: Action
) {
  return weekStatisticsReducer(state, action);
}
