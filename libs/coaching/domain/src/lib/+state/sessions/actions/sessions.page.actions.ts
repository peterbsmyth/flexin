import { createAction, props } from '@ngrx/store';
import { Session } from '@bod/shared/models';

export const loadSessionsByWeek = createAction(
  '[Sessions Page] Load Sessions By Week',
  props<{ id: number }>()
);

export const loadSessionsByWeekSuccess = createAction(
  '[Sessions Page] Load Sessions By Week Success',
  props<{ sessions: Session[] }>()
);

export const loadSessionsByWeekFailure = createAction(
  '[Sessions Page] Load Sessions By Week Failure',
  props<{ error: any }>()
);

export const loadSession = createAction(
  '[Sessions Page] Load Session',
  props<{ id: number }>()
);

export const loadSessionSuccess = createAction(
  '[Sessions Page] Load Session Success',
  props<{ session: Session }>()
);

export const loadSessionFailure = createAction(
  '[Sessions Page] Load Session Failure',
  props<{ error: any }>()
);

export const selectSession = createAction(
  '[Sessions Page] Select Session',
  props<{ id: number }>()
);
