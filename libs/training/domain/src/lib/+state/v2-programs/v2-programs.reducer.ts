import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as V2ProgramsActions from './v2-programs.actions';
import { ProgramV2 } from '@bod/shared/models';

export const V2PROGRAMS_FEATURE_KEY = 'v2Programs';

export interface V2ProgramsState extends EntityState<ProgramV2> {
  selectedId?: string | number; // which V2Programs record has been selected
  loaded: boolean; // has the V2Programs list been loaded
  error?: string | null; // last known error (if any)
}

export const v2ProgramsAdapter: EntityAdapter<ProgramV2> = createEntityAdapter<
  ProgramV2
>();

export const initialState: V2ProgramsState = v2ProgramsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const v2ProgramsReducer = createReducer(
  initialState,
  on(V2ProgramsActions.loadV2Programs, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(V2ProgramsActions.loadV2ProgramsSuccess, (state, { v2Programs }) =>
    v2ProgramsAdapter.upsertMany(v2Programs, { ...state, loaded: true })
  ),
  on(V2ProgramsActions.loadProgramSuccess, (state, { program }) =>
    v2ProgramsAdapter.upsertOne(program, { ...state, loaded: true })
  ),
  on(V2ProgramsActions.loadV2ProgramsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(V2ProgramsActions.selectProgramFromGuard, (state, { id }) => ({
    ...state,
    selectedId: id,
  }))
);

export function reducer(state: V2ProgramsState | undefined, action: Action) {
  return v2ProgramsReducer(state, action);
}
