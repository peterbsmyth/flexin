import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as MealStatisticsActions from './meal-statistics.actions';
import { MealStatistic } from '@bod/shared/models';

export const MEALSTATISTICS_FEATURE_KEY = 'mealStatistics';

export interface MealStatisticsState extends EntityState<MealStatistic> {
  selectedId?: string | number; // which MealStatistics record has been selected
  loaded: boolean; // has the MealStatistics list been loaded
  error?: string | null; // last known error (if any)
}

export const mealStatisticsAdapter: EntityAdapter<MealStatistic> = createEntityAdapter<
  MealStatistic
>();

export const initialState: MealStatisticsState = mealStatisticsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const mealStatisticsReducer = createReducer(
  initialState,
  on(MealStatisticsActions.loadMealStatistics, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    MealStatisticsActions.loadMealStatisticsSuccess,
    (state, { mealStatistics }) =>
      mealStatisticsAdapter.setAll(mealStatistics, { ...state, loaded: true })
  ),
  on(MealStatisticsActions.loadMealStatisticsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: MealStatisticsState | undefined,
  action: Action
) {
  return mealStatisticsReducer(state, action);
}
