import { createAction, props } from '@ngrx/store';
import { Session } from '@bod/shared/domain';

export const loadSession = createAction(
  '[Sessions API] Load Session',
  props<{ id: number }>()
);

export const loadSessionSuccess = createAction(
  '[Sessions API] Load Session Success',
  props<{ session: Session }>()
);

export const loadSessionFailure = createAction(
  '[Sessions API] Load Session Failure',
  props<{ error: any }>()
);
