import { Program, Workout } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';
import { BoardCardData } from '../../entities/component.models';

export const loadPrograms = createAction('[Programs] Load Programs');

export const loadProgramsFromPage = createAction(
  '[Programs][Page] Load Programs'
);

export const loadProgramsSuccess = createAction(
  '[Programs] Load Programs Success',
  props<{ programs: Program[] }>()
);

export const loadProgramsFailure = createAction(
  '[Programs] Load Programs Failure',
  props<{ error: string }>()
);

export const loadProgramFromGuard = createAction(
  '[Programs][Guard] Load Program',
  props<{ id: number }>()
);

export const loadProgramFromPage = createAction(
  '[Programs][Page] Load Program',
  props<{ id: number }>()
);

export const selectProgramFromGuard = createAction(
  '[Programs][Guard] Select Program',
  props<{ id: number }>()
);

export const selectProgramFromPage = createAction(
  '[Programs][Page] Select Program',
  props<{ id: number }>()
);

export const selectWeek = createAction(
  '[Programs] Select Week',
  props<{ week: number }>()
);

export const selectDay = createAction(
  '[Programs] Select Day',
  props<{ day: number }>()
);

export const selectWorkout = createAction(
  '[Programs] Select Workout',
  props<{ id: number }>()
);

export const loadProgramSuccess = createAction(
  '[Programs] Load Program Success',
  props<{ program: Program }>()
);

export const loadProgramFailure = createAction(
  '[Programs] Load Program Failure',
  props<{ error: string }>()
);

export const createProgram = createAction(
  '[Programs] Create Program',
  props<{ data: Workout[]; number: number }>()
);

export const createProgramSuccess = createAction(
  '[Programs] Create Program Success',
  props<{ name: string }>()
);

export const createProgramFailure = createAction(
  '[Programs] Create Program Failure',
  props<{ name: string }>()
);

export const loadDescendantsFromProgramPage = createAction(
  '[Programs][Program Page] Load Descendants',
  props<{ id: number }>()
);

export const loadDescendantsSuccess = createAction(
  '[Programs] Load Descendants Success'
);

export const loadDescendantsFailure = createAction(
  '[Programs] Load Descendants Failure',
  props<{ error: string }>()
);

export const popDraft = createAction('[Programs] Pop Draft');

export const pushDraft = createAction('[Programs] Push Draft');

export const resetDraft = createAction('[Programs] Resest Draft');

export const addIncompleteWorkouts = createAction(
  '[Programs] Add IncompleteWorkouts',
  props<{ board: BoardCardData[][]; weekCount: number }>()
);

export const openWorkoutModal = createAction(
  '[Programs] Open Workout Modal',
  props<{ workoutId: number }>()
);
