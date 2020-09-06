import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SESSIONS_FEATURE_KEY, State as SessionsState } from '@athlete/sessions/+state/sessions.reducer';

import * as WeeksActions from './weeks.actions';
import { Week } from '@bod/models';

export const WEEKS_FEATURE_KEY = 'weeks';

export interface State extends EntityState<Week> {
  selectedId?: string | number; // which Weeks record has been selected
  loaded: boolean; // has the Weeks list been loaded
  error?: string | null; // last none error (if any)
}

export interface WeeksPartialState {
  readonly [WEEKS_FEATURE_KEY]: State;
  readonly [SESSIONS_FEATURE_KEY]: SessionsState;
}

export const weeksAdapter: EntityAdapter<Week> = createEntityAdapter<
  Week
>();

export const initialState: State = weeksAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const weeksReducer = createReducer(
  initialState,
  on(WeeksActions.loadWeeks, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(WeeksActions.loadWeeksSuccess, (state, { weeks }) =>
    weeksAdapter.setAll(weeks, { ...state, loaded: true })
  ),
  on(WeeksActions.loadWeeksFailure, (state, { error }) => ({ ...state, error })),
  on(WeeksActions.selectWeek, (state, { id }) => ({ ...state, selectedId: id })),
  on(WeeksActions.loadWeekSuccess, (state, { week }) => weeksAdapter.setOne(week, { ...state, loaded: true, selectedId: week.id })),
);

export function reducer(state: State | undefined, action: Action) {
  return weeksReducer(state, action);
}
