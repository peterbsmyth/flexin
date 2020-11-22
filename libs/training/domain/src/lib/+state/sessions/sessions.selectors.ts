import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SESSIONS_FEATURE_KEY,
  SessionsState,
  sessionsAdapter,
} from './sessions.reducer';
import { WEEKS_FEATURE_KEY, WeeksState } from '../weeks/weeks.reducer';
import {
  PROGRAMS_FEATURE_KEY,
  ProgramsState,
} from '../programs/programs.reducer';
import { State } from '../state';
import { getAllSessionItems } from '../session-items/session-items.selectors';
import { Pages, Session } from '@bod/shared/models';

// Lookup the 'Sessions' feature state managed by NgRx
export const getSessionsState = createFeatureSelector<State, SessionsState>(
  SESSIONS_FEATURE_KEY
);

export const getWeeksState = createFeatureSelector<State, WeeksState>(
  WEEKS_FEATURE_KEY
);

export const getSelectedWeekId = createSelector(
  getWeeksState,
  (state: WeeksState) => state.selectedId
);

export const getWeeksEntities = createSelector(
  getWeeksState,
  (state: WeeksState) => state.entities
);

export const getProgramsState = createFeatureSelector<State, ProgramsState>(
  PROGRAMS_FEATURE_KEY
);

export const getProgramsEntities = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.entities
);

const { selectAll, selectEntities, selectIds } = sessionsAdapter.getSelectors();

export const getSessionsLoaded = createSelector(
  getSessionsState,
  (state: SessionsState) => state.loaded
);

export const getSessionsError = createSelector(
  getSessionsState,
  (state: SessionsState) => state.error
);

export const getAllSessions = createSelector(
  getSessionsState,
  (state: SessionsState) => selectAll(state)
);

export const getSessionsEntities = createSelector(
  getSessionsState,
  (state: SessionsState) => selectEntities(state)
);

export const getSessionsIds = createSelector(
  getSessionsState,
  (state: SessionsState) => selectIds(state)
);

export const getSelectedId = createSelector(
  getSessionsState,
  (state: SessionsState) => state.selectedId
);

export const getSelected = createSelector(
  getSessionsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getSelectedWithAscendants = createSelector(
  getSelected,
  getWeeksEntities,
  getProgramsEntities,
  (session, weeksEntities, programsEntities) => {
    const week = weeksEntities[session.weekId];
    const program = week && programsEntities[week.programId];

    return {
      ...session,
      week: {
        ...week,
        program,
      },
    };
  }
);

export const getSessionItems = createSelector(
  getSelected,
  getAllSessionItems,
  (session, sessionItems) => {
    return (
      session &&
      sessionItems
        .filter((sessionItem) => sessionItem.sessionId === session.id)
        .sort((a, b) => a.order - b.order)
    );
  }
);

export const getPages = createSelector(
  getSelectedId,
  getSelectedWeekId,
  getAllSessions,
  (id, weekId, sessions: Session[]): Pages => {
    const sorted = sessions
      .filter((session) => session.weekId === weekId)
      .sort((a, b) => a.order - b.order)
      .map((s) => s.id);
    const idIndex = sorted.findIndex((currentId) => currentId === id);
    const isFirst = idIndex === 0;
    const isLast = idIndex === sorted.length - 1;
    const previousId = isFirst ? null : sorted[idIndex - 1];
    const nextId = isLast ? null : sorted[idIndex + 1];
    return {
      isFirst,
      isLast,
      previousId,
      nextId,
    };
  }
);
