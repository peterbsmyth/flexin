import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { SessionItemsActions } from './actions';
import { SessionItem } from '@bod/shared/models';

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
  on(
    SessionItemsActions.loadSessionItemsBySession,
    SessionItemsActions.loadSessionItemApi,
    SessionItemsActions.loadSessionItem,
    SessionItemsActions.loadSessionItemWithExercise,
    (state) => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(
    SessionItemsActions.updateSessionItem,
    SessionItemsActions.loadSessionItemApiSuccess,
    SessionItemsActions.loadSessionItemSuccess,
    SessionItemsActions.loadSessionItemWithExerciseSuccess,
    (state, { sessionItem }) =>
      sessionItemsAdapter.upsertOne(sessionItem, { ...state, loaded: true })
  ),
  on(
    SessionItemsActions.loadSessionItemApiFailure,
    SessionItemsActions.loadSessionItemFailure,
    SessionItemsActions.loadSessionItemWithExerciseFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  ),
  on(SessionItemsActions.selectSessionItem, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(
    SessionItemsActions.loadSessionItemsBySessionSuccess,
    (state, { sessionItems }) =>
      sessionItemsAdapter.upsertMany(sessionItems, { ...state, loaded: true })
  ),
  on(
    SessionItemsActions.loadSessionItemsBySessionFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);

export function reducer(state: SessionItemsState | undefined, action: Action) {
  return sessionItemsReducer(state, action);
}
