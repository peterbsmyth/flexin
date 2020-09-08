import { createAction, props } from '@ngrx/store';
import { Week } from '@bod/shared/models';

export const loadWeeks = createAction('[Weeks API] Load Weeks');

export const loadWeeksSuccess = createAction(
  '[Weeks API] Load Weeks Success',
  props<{ weeks: Week[] }>()
);

export const loadWeeksFailure = createAction(
  '[Weeks API] Load Weeks Failure',
  props<{ error: any }>()
);
