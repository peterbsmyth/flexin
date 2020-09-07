import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WEEKS_FEATURE_KEY,
  weeksAdapter,
  WeeksState,
} from './weeks.reducer';
import { PartialState } from '../root.reducer';
import { getSessionsEntities } from '../sessions/sessions.selectors';

// Lookup the 'Weeks' feature state managed by NgRx
export const getWeeksState = createFeatureSelector<PartialState, WeeksState>(
  WEEKS_FEATURE_KEY
);

const { selectAll, selectEntities } = weeksAdapter.getSelectors();

export const getWeeksLoaded = createSelector(
  getWeeksState,
  (state: WeeksState) => state.loaded
);

export const getWeeksError = createSelector(
  getWeeksState,
  (state: WeeksState) => state.error
);

export const getAllWeeks = createSelector(getWeeksState, (state: WeeksState) =>
  selectAll(state)
);

export const getWeeksEntities = createSelector(getWeeksState, (state: WeeksState) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getWeeksState,
  (state: WeeksState) => state.selectedId
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