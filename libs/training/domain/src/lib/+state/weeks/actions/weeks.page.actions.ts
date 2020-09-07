import { createAction, props } from '@ngrx/store';
import { Week } from '@bod/shared/domain';

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


export const selectWeek = createAction(
  '[Weeks Page] Select Week',
  props<{ id: number }>()
);
