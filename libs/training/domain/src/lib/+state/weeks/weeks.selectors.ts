import { createSelector } from '@ngrx/store';
import { weeksAdapter, WeeksState } from './weeks.reducer';
import { getAllSessions } from '../sessions/sessions.selectors';
import { ProgramsState } from '../programs/programs.reducer';
import { trainingSelector } from '../selector';

export const getWeeksState = createSelector(
  trainingSelector,
  (state) => state.weeks
);

export const getProgramsState = createSelector(
  trainingSelector,
  (state) => state.programs
);

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
