import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEEKS_FEATURE_KEY, weeksAdapter, WeeksState } from './weeks.reducer';
import { PartialState } from '../root.reducer';
import { getAllSessions } from '../sessions/sessions.selectors';
import {
  ProgramsState,
  PROGRAMS_FEATURE_KEY,
} from '../programs/programs.reducer';

// Lookup the 'Weeks' feature state managed by NgRx
export const getWeeksState = createFeatureSelector<PartialState, WeeksState>(
  WEEKS_FEATURE_KEY
);

export const getProgramsState = createFeatureSelector<
  PartialState,
  ProgramsState
>(PROGRAMS_FEATURE_KEY);

export const getProgramsEntities = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.entities
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

export const getWeeksEntities = createSelector(
  getWeeksState,
  (state: WeeksState) => selectEntities(state)
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
  getAllSessions,
  (week, sessions) => {
    return (
      week &&
      sessions
        .filter((session) => session.weekId === week.id)
        .sort((a, b) => a.order - b.order)
    );
  }
);

export const getSelectedWithAscendants = createSelector(
  getSelected,
  getProgramsEntities,
  (week, programsEntities) => {
    const program = week && programsEntities[week.programId];

    return {
      ...week,
      program,
    };
  }
);
