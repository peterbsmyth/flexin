import { createAction, props } from '@ngrx/store';
import { Program } from '@bod/shared/domain';

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
