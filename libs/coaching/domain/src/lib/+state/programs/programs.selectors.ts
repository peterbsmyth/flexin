import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PROGRAMS_FEATURE_KEY,
  ProgramsState,
  programsAdapter,
} from './programs.reducer';
import { PartialState } from '../root.reducer';
import { getAllWeeks } from '../weeks/weeks.selectors';
import { getAllSessions } from '../sessions/sessions.selectors';
import { getAllSessionItems } from '../session-items/session-items.selectors';
import { getExercisesEntities } from '../exercises/exercises.selectors';
import { Session, SessionItem } from '@bod/shared/models';

// Lookup the 'Programs' feature state managed by NgRx
export const getProgramsState = createFeatureSelector<
  PartialState,
  ProgramsState
>(PROGRAMS_FEATURE_KEY);

const { selectAll, selectEntities } = programsAdapter.getSelectors();

export const getProgramsLoaded = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.loaded
);

export const getProgramsError = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.error
);

export const getAllPrograms = createSelector(
  getProgramsState,
  (state: ProgramsState) => selectAll(state)
);

export const getProgramsEntities = createSelector(
  getProgramsState,
  (state: ProgramsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.selectedId
);

export const getSelected = createSelector(
  getProgramsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getWeeks = createSelector(
  getSelected,
  getAllWeeks,
  (program, weeks) => {
    return (
      program &&
      weeks
        .filter((week) => week.programId === program.id)
        .sort((a, b) => a.number - b.number)
    );
  }
);

export const getSessions = createSelector(
  getWeeks,
  getAllSessions,
  (weeks, sessions) => {
    let allSessions: Session[] = [];
    weeks.forEach((week) => {
      allSessions = [
        ...allSessions,
        ...sessions.filter((session) => session.weekId === week.id),
      ];
    });
    return allSessions;
  }
);

export const getSessionItems = createSelector(
  getSessions,
  getAllSessionItems,
  (sessions, sessionItems) => {
    let allSessionItems: SessionItem[] = [];
    sessions.forEach((session) => {
      allSessionItems = [
        ...allSessionItems,
        ...sessionItems.filter(
          (sessionItem) => sessionItem.sessionId === session.id
        ),
      ];
    });
    return allSessionItems
      .sort((a, b) => a.order - b.order)
      .sort((a, b) => a.sessionId - b.sessionId);
  }
);

export const getExercises = createSelector(
  getSessionItems,
  getExercisesEntities,
  (sessionItems, exerciseEntities) => {
    const allExercises = sessionItems.map(
      (sessionItem) => exerciseEntities[sessionItem.exerciseId]
    );
    return allExercises;
  }
);

export const getSelectedWithDescendants = createSelector(
  getSelected,
  getWeeks,
  getSessions,
  getSessionItems,
  getExercises,
  (program, weeks, sessions, sessionItems, exercises) => {
    return {
      program,
      weeks,
      sessions,
      sessionItems,
      exercises,
    };
  }
);
