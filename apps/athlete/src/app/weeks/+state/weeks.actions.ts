import { createAction, props } from '@ngrx/store';
import { Week } from '@bod/shared/domain';

export const loadWeeks = createAction('[Weeks] Load Weeks');

export const loadWeeksSuccess = createAction(
  '[Weeks] Load Weeks Success',
  props<{ weeks: Week[] }>()
);

export const loadWeeksFailure = createAction(
  '[Weeks] Load Weeks Failure',
  props<{ error: any }>()
);

export const loadWeek = createAction('[Weeks] Load Week');

export const loadWeekSuccess = createAction(
  '[Weeks] Load Week Success',
  props<{ week: Week }>()
);

export const loadWeekFailure = createAction(
  '[Weeks] Load Week Failure',
  props<{ error: any }>()
);

export const selectWeek = createAction(
  '[Weeks] Select Week',
  props<{ id: number }>()
);
