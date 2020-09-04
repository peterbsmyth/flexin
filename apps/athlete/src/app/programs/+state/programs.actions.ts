import { createAction, props } from '@ngrx/store';
import { Program } from '@bod/models';

export const loadPrograms = createAction('[Programs] Load Programs');

export const loadProgramsSuccess = createAction(
  '[Programs] Load Programs Success',
  props<{ programs: Program[] }>()
);

export const loadProgramsFailure = createAction(
  '[Programs] Load Programs Failure',
  props<{ error: any }>()
);
