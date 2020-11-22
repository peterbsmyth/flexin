import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as V2ProgramsActions from './v2-programs.actions';
import * as WorkoutsActions from '../workouts/workouts.actions';
import * as V2SetStatisticsActions from '../v2-set-statistics/v2-set-statistics.actions';
import { ProgramV2 } from '@bod/shared/models';

export const V2PROGRAMS_FEATURE_KEY = 'v2Programs';

export interface V2ProgramsState extends EntityState<ProgramV2> {
  selectedId?: number; // which V2Programs record has been selected
  selectedWeek?: number;
  selectedDay?: number;
  selectedWorkoutId?: number;
  loaded: boolean; // has the V2Programs list been loaded
  error?: string | null; // last known error (if any)
}

export const v2ProgramsAdapter: EntityAdapter<ProgramV2> = createEntityAdapter<
  ProgramV2
>();

export const initialState: V2ProgramsState = v2ProgramsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const v2ProgramsReducer = createReducer(
  initialState,
  on(V2ProgramsActions.loadV2Programs, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(V2ProgramsActions.loadV2ProgramsSuccess, (state, { v2Programs }) =>
    v2ProgramsAdapter.upsertMany(v2Programs, { ...state, loaded: true })
  ),
  on(V2ProgramsActions.loadProgramSuccess, (state, { program }) =>
    v2ProgramsAdapter.upsertOne(program, { ...state, loaded: true })
  ),
  on(V2ProgramsActions.loadV2ProgramsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    V2ProgramsActions.selectProgramFromPage,
    V2ProgramsActions.selectProgramFromGuard,
    (state, { id }) => ({
      ...state,
      selectedId: id,
    })
  ),
  on(V2ProgramsActions.selectWeek, (state, { week }) => ({
    ...state,
    selectedWeek: week,
  })),
  on(V2ProgramsActions.selectDay, (state, { day }) => ({
    ...state,
    selectedDay: day,
  })),
  on(V2ProgramsActions.selectWorkout, (state, { id }) => ({
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
    v2ProgramsAdapter.updateOne(
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
  on(V2SetStatisticsActions.updateV2SetStatistic, (state, { v2SetStatistic }) =>
    v2ProgramsAdapter.updateOne(
      {
        id: state.selectedId,
        changes: {
          setStatistics: state.entities[state.selectedId].setStatistics.map(
            (s) =>
              s.id === v2SetStatistic.id
                ? {
                    ...s,
                    ...v2SetStatistic,
                  }
                : s
          ),
          workouts: state.entities[state.selectedId].workouts.map((w) =>
            w.id === state.selectedWorkoutId
              ? {
                  ...w,
                  setStatistics: w.setStatistics.map((s) =>
                    s.id === v2SetStatistic.id
                      ? {
                          ...s,
                          ...v2SetStatistic,
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

export function reducer(state: V2ProgramsState | undefined, action: Action) {
  return v2ProgramsReducer(state, action);
}
