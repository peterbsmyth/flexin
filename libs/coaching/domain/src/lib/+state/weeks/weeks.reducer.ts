import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { WeeksActions } from './actions';
import { Week } from '@bod/shared/models';

export const WEEKS_FEATURE_KEY = 'weeks';

export interface WeeksState extends EntityState<Week> {
  selectedId?: string | number; // which Weeks record has been selected
  loaded: boolean; // has the Weeks list been loaded
  error?: string | null; // last none error (if any)
}

export const weeksAdapter: EntityAdapter<Week> = createEntityAdapter<Week>();

export const initialState: WeeksState = weeksAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

export const weeksReducer = createReducer(
  initialState,
  on(
    WeeksActions.loadWeek,
    WeeksActions.loadWeeksByProgram,
    (state) => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(WeeksActions.selectWeek, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(WeeksActions.loadWeekSuccess, (state, { week }) =>
    weeksAdapter.setOne(week, { ...state, loaded: true, selectedId: week.id })
  ),
  on(WeeksActions.loadWeeksByProgramSuccess, (state, { weeks }) =>
    weeksAdapter.upsertMany(weeks, { ...state, loaded: true })
  ),
  on(WeeksActions.loadWeeksByProgramFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: WeeksState | undefined, action: Action) {
  return weeksReducer(state, action);
}
