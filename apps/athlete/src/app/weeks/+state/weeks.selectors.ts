import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WEEKS_FEATURE_KEY,
  State,
  WeeksPartialState,
  weeksAdapter,
} from './weeks.reducer';
import { getSessionsEntities } from '@athlete/sessions/+state/sessions.selectors';

// Lookup the 'Weeks' feature state managed by NgRx
export const getWeeksState = createFeatureSelector<WeeksPartialState, State>(
  WEEKS_FEATURE_KEY
);

const { selectAll, selectEntities } = weeksAdapter.getSelectors();

export const getWeeksLoaded = createSelector(
  getWeeksState,
  (state: State) => state.loaded
);

export const getWeeksError = createSelector(
  getWeeksState,
  (state: State) => state.error
);

export const getAllWeeks = createSelector(getWeeksState, (state: State) =>
  selectAll(state)
);

export const getWeeksEntities = createSelector(getWeeksState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getWeeksState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getWeeksEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getSessions = createSelector(
  getSelected,
  getSessionsEntities,
  (week, sessionsEntities) => {
    return week && week.sessions.map(session => sessionsEntities[session])
  }
)