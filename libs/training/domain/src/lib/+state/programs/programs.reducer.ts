import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProgramsActions from './programs.actions';
import * as WorkoutsActions from '../workouts/workouts.actions';
import * as SetStatisticsActions from '../set-statistics/set-statistics.actions';
import { Program } from '@bod/shared/models';

export const PROGRAMS_FEATURE_KEY = 'programs';

export interface ProgramsState extends EntityState<Program> {
  selectedId?: number; // which Programs record has been selected
  selectedWeek?: number;
  selectedDay?: number;
  selectedWorkoutId?: number;
  openWorkoutModalId?: number;
  loaded: boolean; // has the Programs list been loaded
  error?: string | null; // last known error (if any)
}

export const programsAdapter: EntityAdapter<Program> = createEntityAdapter<
  Program
>();

export const initialState: ProgramsState = programsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const programsReducer = createReducer(
  initialState,
  on(ProgramsActions.loadPrograms, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProgramsActions.loadProgramsSuccess, (state, { programs }) =>
    programsAdapter.upsertMany(programs, { ...state, loaded: true })
  ),
  on(ProgramsActions.loadProgramSuccess, (state, { program }) =>
    programsAdapter.upsertOne(program, { ...state, loaded: true })
  ),
  on(ProgramsActions.loadProgramsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ProgramsActions.selectProgramFromPage,
    ProgramsActions.selectProgramFromGuard,
    (state, { id }) => ({
      ...state,
      selectedId: id,
    })
  ),
  on(ProgramsActions.openWorkoutModal, (state, { workoutId }) => ({
    ...state,
    openWorkoutModalId: workoutId,
  })),
  on(ProgramsActions.selectWeek, (state, { week }) => ({
    ...state,
    selectedWeek: week,
  })),
  on(ProgramsActions.selectDay, (state, { day }) => ({
    ...state,
    selectedDay: day,
  })),
  on(ProgramsActions.selectWorkout, (state, { id }) => ({
    ...state,
    selectedWorkoutId: id,
  })),
  /**
   * update the workout for the selected program and when
   * iterating through the workouts if the id of the workout
   * in the action matches the id of the iterated workout
   * update that workout, else use the iterated workout
   */
  on(WorkoutsActions.updateWorkout, (state, { workout }) =>
    programsAdapter.updateOne(
      {
        id: state.selectedId,
        changes: {
          workouts: state.entities[state.selectedId].workouts.map((w) =>
            w.id === workout.id
              ? {
                  ...w,
                  ...workout,
                }
              : w
          ),
        },
      },
      { ...state, loaded: true }
    )
  ),
  on(SetStatisticsActions.updateSetStatistic, (state, { setStatistic }) =>
    programsAdapter.updateOne(
      {
        id: state.selectedId,
        changes: {
          setStatistics: state.entities[state.selectedId].setStatistics.map(
            (s) =>
              s.id === setStatistic.id
                ? {
                    ...s,
                    ...setStatistic,
                  }
                : s
          ),
          workouts: state.entities[state.selectedId].workouts.map((w) =>
            w.id === state.selectedWorkoutId
              ? {
                  ...w,
                  setStatistics: w.setStatistics.map((s) =>
                    s.id === setStatistic.id
                      ? {
                          ...s,
                          ...setStatistic,
                        }
                      : s
                  ),
                }
              : w
          ),
        },
      },
      { ...state, loaded: true }
    )
  )
);

export function reducer(state: ProgramsState | undefined, action: Action) {
  return programsReducer(state, action);
}
