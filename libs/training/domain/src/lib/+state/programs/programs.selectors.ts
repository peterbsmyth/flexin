import { createSelector } from '@ngrx/store';
import { getAllExercises } from '../exercises/exercises.selectors';
import { trainingSelector } from '../selector';
import { programsAdapter, ProgramsState } from './programs.reducer';

export const getProgramsState = createSelector(
  trainingSelector,
  (state) => state.programs
);

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

export const getSelectedWeek = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.selectedWeek
);

export const getSelectedDay = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.selectedDay
);

export const getSelectedWorkoutId = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.selectedWorkoutId
);

export const getOpenWorkoutModalId = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.openWorkoutModalId
);

export const getSelected = createSelector(
  getProgramsEntities,
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

export const getWorkoutFormData = createSelector(
  getSelected,
  getOpenWorkoutModalId,
  getAllExercises,
  (program, workoutId, exercises) => {
    const workout = program?.workouts.find((w) => w.id === workoutId);

    return {
      workout,
      exercises,
    };
  }
);

export const getBoard = createSelector(
  getSelected,
  getAllExercises,
  getSelectedWeek,
  (program, exercises, week) => {
    const workouts = program.workouts.filter(
      (workout) => workout.week === week
    );
    const allDays = program.workouts.map((workout) => workout.day);
    const sortedDays = [...new Set(allDays)].sort();
    const board = sortedDays.map((dayNumber) => {
      return workouts
        .filter((workout) => workout.day === dayNumber)
        .map((workout) => ({
          name: exercises.find((exercise) => workout.exerciseId === exercise.id)
            ?.name,
          id: workout.id,
        }));
    });
    return board;
  }
);
