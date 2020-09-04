import { createAction, props } from '@ngrx/store';
import { Week } from '@bod/models';

export const loadWeeks = createAction('[Weeks] Load Weeks');

export const loadWeeksSuccess = createAction(
  '[Weeks] Load Weeks Success',
  props<{ weeks: Week[] }>()
);

export const loadWeeksFailure = createAction(
  '[Weeks] Load Weeks Failure',
  props<{ error: any }>()
);

export const selectWeek = createAction(
  '[Weeks] Select Week',
  props<{ id: number }>()
);
