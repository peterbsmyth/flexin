import { createAction, props } from '@ngrx/store';
import { Program, BoardCardData } from '@bod/shared/models';

export const loadPrograms = createAction('[Programs Page] Load Programs');

export const loadProgramsSuccess = createAction(
  '[Programs Page] Load Programs Success',
  props<{ programs: Program[] }>()
);

export const loadProgramsFailure = createAction(
  '[Programs Page] Load Programs Failure',
  props<{ error: any }>()
);

export const loadProgram = createAction(
  '[Programs Page] Load Program',
  props<{ id: number }>()
);

export const loadProgramSuccess = createAction(
  '[Programs Page] Load Program Success',
  props<{ program: Program }>()
);

export const loadProgramFailure = createAction(
  '[Programs Page] Load Program Failure',
  props<{ error: any }>()
);

export const selectProgram = createAction(
  '[Programs Page] Select Program',
  props<{ id: number }>()
);

export const addIncompleteSessionItems = createAction(
  '[Programs Page] Add Incomplete Session Items',
  props<{ lists: BoardCardData[][] }>()
);

export const everythingExceptCreateProgram = createAction(
  '[Programs Page] Everything Except Create Program',
  props<{ data: any }>()
)

export const createProgram = createAction(
  '[Programs Page] Create Program',
  props<{ name: string }>()
);

export const createProgramSuccess = createAction(
  '[Programs Page] Create Program Success',
  props<{ name: string }>()
);

export const createProgramFailure = createAction(
  '[Programs Page] Create Program Failure',
  props<{ name: string }>()
);

export const loadDescendants = createAction(
  '[Programs Page] Load Descendants',
  props<{ id: number }>()
);

export const loadDescendantsSuccess = createAction(
  '[Programs Page] Load Descendants Success'
);

export const loadDescendantsFailure = createAction(
  '[Programs Page] Load Descendants Failure',
  props<{ error: any }>()
);
