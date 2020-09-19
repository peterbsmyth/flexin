import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { SessionItemsApiActions, SessionItemsPageActions } from './actions';
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
    SessionItemsPageActions.loadSessionItemsBySession,
    SessionItemsApiActions.loadSessionItem,
    SessionItemsPageActions.loadSessionItem,
    SessionItemsPageActions.loadSessionItemWithExercise,
    (state) => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(
    SessionItemsPageActions.updateSessionItem,
    SessionItemsApiActions.loadSessionItemSuccess,
    SessionItemsPageActions.loadSessionItemSuccess,
    SessionItemsPageActions.loadSessionItemWithExerciseSuccess,
    (state, { sessionItem }) =>
      sessionItemsAdapter.upsertOne(sessionItem, { ...state, loaded: true })
  ),
  on(
    SessionItemsApiActions.loadSessionItemFailure,
    SessionItemsPageActions.loadSessionItemFailure,
    SessionItemsPageActions.loadSessionItemWithExerciseFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  ),
  on(SessionItemsPageActions.selectSessionItem, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(
    SessionItemsPageActions.loadSessionItemsBySessionSuccess,
    (state, { sessionItems }) =>
      sessionItemsAdapter.upsertMany(sessionItems, { ...state, loaded: true })
  ),
  on(
    SessionItemsPageActions.loadSessionItemsBySessionFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);

export function reducer(state: SessionItemsState | undefined, action: Action) {
  return sessionItemsReducer(state, action);
}
