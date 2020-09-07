import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProgramsActions from './programs.actions';
import { Program } from '@bod/shared/domain';

export const PROGRAMS_FEATURE_KEY = 'programs';

export interface State extends EntityState<Program> {
  selectedId?: string | number; // which Programs record has been selected
  loaded: boolean; // has the Programs list been loaded
  error?: string | null; // last none error (if any)
}

export interface ProgramsPartialState {
  readonly [PROGRAMS_FEATURE_KEY]: State;
}

export const programsAdapter: EntityAdapter<Program> = createEntityAdapter<
  Program
>();

export const initialState: State = programsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const programsReducer = createReducer(
  initialState,
  on(
    ProgramsActions.loadPrograms,
    ProgramsActions.loadProgram,
    (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProgramsActions.loadProgramsSuccess, (state, { programs }) =>
    programsAdapter.setAll(programs, { ...state, loaded: true })
  ),
  on(ProgramsActions.loadProgramSuccess, (state, { program }) =>
    programsAdapter.addOne(program, { ...state, loaded: true, selectedId: program.id })
  ),
  on(ProgramsActions.loadProgramsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return programsReducer(state, action);
}
