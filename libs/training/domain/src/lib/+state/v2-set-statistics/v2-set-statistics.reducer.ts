import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as V2SetStatisticsActions from './v2-set-statistics.actions';
import { SetStatisticV2 } from '@bod/shared/models';

export const V2SETSTATISTICS_FEATURE_KEY = 'v2SetStatistics';

export interface V2SetStatisticsState extends EntityState<SetStatisticV2> {
  selectedId?: string | number; // which V2SetStatistics record has been selected
  loaded: boolean; // has the V2SetStatistics list been loaded
  error?: string | null; // last known error (if any)
}

export const v2SetStatisticsAdapter: EntityAdapter<SetStatisticV2> = createEntityAdapter<
  SetStatisticV2
>();

export const initialState: V2SetStatisticsState = v2SetStatisticsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const v2SetStatisticsReducer = createReducer(
  initialState,
  on(V2SetStatisticsActions.loadV2SetStatistics, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    V2SetStatisticsActions.loadV2SetStatisticsSuccess,
    (state, { v2SetStatistics }) =>
      v2SetStatisticsAdapter.setAll(v2SetStatistics, { ...state, loaded: true })
  ),
  on(V2SetStatisticsActions.loadV2SetStatisticsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: V2SetStatisticsState | undefined,
  action: Action
) {
  return v2SetStatisticsReducer(state, action);
}
