import { createAction, props } from '@ngrx/store';
import { Session } from '@bod/models';

export const loadSessions = createAction('[Sessions] Load Sessions');

export const loadSessionsSuccess = createAction(
  '[Sessions] Load Sessions Success',
  props<{ sessions: Session[] }>()
);

export const loadSessionsFailure = createAction(
  '[Sessions] Load Sessions Failure',
  props<{ error: any }>()
);

export const loadSession = createAction(
  '[Sessions] Load Session',
  props<{ id: number }>()
);

export const loadSessionSuccess = createAction(
  '[Sessions] Load Session Success',
  props<{ session: Session }>()
);

export const loadSessionFailure = createAction(
  '[Sessions] Load Session Failure',
  props<{ error: any }>()
);

export const selectSession = createAction(
  '[Sessions] Select Session',
  props<{ id: number }>()
);
