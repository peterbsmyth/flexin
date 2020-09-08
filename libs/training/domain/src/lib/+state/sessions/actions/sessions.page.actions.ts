import { createAction, props } from '@ngrx/store';
import { Session } from '@bod/shared/models';

export const loadSessions = createAction('[Sessions Page] Load Sessions');

export const loadSessionsSuccess = createAction(
  '[Sessions Page] Load Sessions Success',
  props<{ sessions: Session[] }>()
);

export const loadSessionsFailure = createAction(
  '[Sessions Page] Load Sessions Failure',
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
