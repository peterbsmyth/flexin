import { createAction, props } from '@ngrx/store';
import { Program } from '@bod/shared/domain';

export const loadPrograms = createAction('[Programs] Load Programs');

export const loadProgramsSuccess = createAction(
  '[Programs] Load Programs Success',
  props<{ programs: Program[] }>()
);

export const loadProgramsFailure = createAction(
  '[Programs] Load Programs Failure',
  props<{ error: any }>()
);

export const loadProgram = createAction(
  '[Programs] Load Program'
);

export const loadProgramSuccess = createAction(
  '[Programs] Load Program Success',
  props<{ program: Program }>()
);

export const loadProgramFailure = createAction(
  '[Programs] Load Program Failure',
  props<{ error: any }>()
);
