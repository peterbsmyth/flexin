import { ProgramV2, Workout } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';
import { BoardCardData } from '../../entities/component.models';

export const loadV2Programs = createAction('[V2Programs] Load V2Programs');

export const loadV2ProgramsSuccess = createAction(
  '[V2Programs] Load V2Programs Success',
  props<{ v2Programs: ProgramV2[] }>()
);

export const loadV2ProgramsFailure = createAction(
  '[V2Programs] Load V2Programs Failure',
  props<{ error: any }>()
);

export const loadProgramFromGuard = createAction(
  '[V2Programs][Guard] Load Program',
  props<{ id: number }>()
);

export const selectProgramFromGuard = createAction(
  '[V2Programs][Guard] Select Program',
  props<{ id: number }>()
);

export const loadProgramSuccess = createAction(
  '[V2Programs] Load Program Success',
  props<{ program: ProgramV2 }>()
);

export const loadProgramFailure = createAction(
  '[V2Programs] Load Program Failure',
  props<{ error: any }>()
);

export const createProgram = createAction(
  '[V2Programs] Create Program',
  props<{ data: Workout[]; number: number }>()
);

export const createProgramSuccess = createAction(
  '[V2Programs] Create Program Success',
  props<{ name: string }>()
);

export const createProgramFailure = createAction(
  '[V2Programs] Create Program Failure',
  props<{ name: string }>()
);

export const loadDescendantsFromProgramPage = createAction(
  '[V2Programs][Program Page] Load Descendants',
  props<{ id: number }>()
);

export const loadDescendantsSuccess = createAction(
  '[V2Programs] Load Descendants Success'
);

export const loadDescendantsFailure = createAction(
  '[V2Programs] Load Descendants Failure',
  props<{ error: any }>()
);

export const popDraft = createAction('[V2Programs] Pop Draft');

export const pushDraft = createAction('[V2Programs] Push Draft');

export const resetDraft = createAction('[V2Programs] Resest Draft');

export const addIncompleteWorkouts = createAction(
  '[V2Programs] Add IncompleteWorkouts',
  props<{ board: BoardCardData[][]; weekCount: number }>()
);
