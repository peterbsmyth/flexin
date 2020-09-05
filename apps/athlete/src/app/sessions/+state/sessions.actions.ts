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
