import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { SessionItemsApiActions } from './actions';
import { SessionItem } from '@bod/shared/domain';

export const SESSIONITEMS_FEATURE_KEY = 'sessionItems';

export interface SessionItemsState extends EntityState<SessionItem> {
  selectedId?: string | number; // which SessionItems record has been selected
  loaded: boolean; // has the SessionItems list been loaded
  error?: string | null; // last known error (if any)
}

export const sessionItemsAdapter: EntityAdapter<SessionItem> = createEntityAdapter<
  SessionItem
>();

export const initialState: SessionItemsState = sessionItemsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

export const sessionItemsReducer = createReducer(
  initialState,
  on(SessionItemsApiActions.loadSessionItems, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    SessionItemsApiActions.loadSessionItemsSuccess,
    (state, { sessionItems }) =>
      sessionItemsAdapter.setAll(sessionItems, { ...state, loaded: true })
  ),
  on(SessionItemsApiActions.loadSessionItemsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: SessionItemsState | undefined, action: Action) {
  return sessionItemsReducer(state, action);
}
