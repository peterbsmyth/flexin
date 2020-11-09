import { ProgramV2 } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

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
