import { createAction, props } from '@ngrx/store';
import { Week } from '@bod/shared/models';

export const loadWeek = createAction(
  '[Weeks Page] Load Week',
  props<{ id: number }>()
);

export const loadWeekSuccess = createAction(
  '[Weeks Page] Load Week Success',
  props<{ week: Week }>()
);

export const loadWeekFailure = createAction(
  '[Weeks Page] Load Week Failure',
  props<{ error: any }>()
);

export const loadWeeksByProgram = createAction(
  '[Sessions Page] Load Weeks By Program',
  props<{ id: number }>()
);

export const loadWeeksByProgramSuccess = createAction(
  '[Sessions Page] Load Weeks By Program Success',
  props<{ weeks: Week[] }>()
);

export const loadWeeksByProgramFailure = createAction(
  '[Sessions Page] Load Weeks By Program Failure',
  props<{ error: any }>()
);

export const selectWeek = createAction(
  '[Weeks Page] Select Week',
  props<{ id: number }>()
);
