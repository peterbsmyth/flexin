import { createSelector } from '@ngrx/store';
import { trainingSelector } from '../selector';
import { V2ProgramsState, v2ProgramsAdapter } from './v2-programs.reducer';

export const getV2ProgramsState = createSelector(
  trainingSelector,
  (state) => state.v2Programs
);

const { selectAll, selectEntities } = v2ProgramsAdapter.getSelectors();

export const getV2ProgramsLoaded = createSelector(
  getV2ProgramsState,
  (state: V2ProgramsState) => state.loaded
);

export const getV2ProgramsError = createSelector(
  getV2ProgramsState,
  (state: V2ProgramsState) => state.error
);

export const getAllV2Programs = createSelector(
  getV2ProgramsState,
  (state: V2ProgramsState) => selectAll(state)
);

export const getV2ProgramsEntities = createSelector(
  getV2ProgramsState,
  (state: V2ProgramsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getV2ProgramsState,
  (state: V2ProgramsState) => state.selectedId
);

export const getSelectedWeek = createSelector(
  getV2ProgramsState,
  (state: V2ProgramsState) => state.selectedWeek
);

export const getSelectedDay = createSelector(
  getV2ProgramsState,
  (state: V2ProgramsState) => state.selectedDay
);

export const getSelectedWorkoutId = createSelector(
  getV2ProgramsState,
  (state: V2ProgramsState) => state.selectedWorkoutId
);

export const getSelected = createSelector(
  getV2ProgramsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getWeeks = createSelector(getSelected, (program) => {
  const weeks = program.workouts.map((workout) => workout.week);
  return [...new Set(weeks)];
});

export const getDays = createSelector(
  getSelected,
  getSelectedWeek,
  (program, week) => {
    const days = program.workouts
      .filter((w) => w.week === week)
      .map((workout) => workout.day);
    return [...new Set(days)];
  }
);

export const getDaysWorkouts = createSelector(
  getSelected,
  getSelectedWeek,
  getSelectedDay,
  (program, week, day) =>
    program.workouts.filter(
      (workout) => workout.week === week && workout.day === day
    )
);

export const selectedWorkout = createSelector(
  getSelected,
  getSelectedWorkoutId,
  (program, workoutId) =>
    program.workouts.find((workout) => workout.id === workoutId)
);
