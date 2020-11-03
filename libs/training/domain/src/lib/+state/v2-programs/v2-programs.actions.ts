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
