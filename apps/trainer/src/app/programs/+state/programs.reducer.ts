import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProgramsPageActions from './programs.actions';
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
    ProgramsPageActions.loadPrograms,
    ProgramsPageActions.loadProgram,
    (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProgramsPageActions.loadProgramsSuccess, (state, { programs }) =>
    programsAdapter.setAll(programs, { ...state, loaded: true })
  ),
  on(ProgramsPageActions.loadProgramSuccess, (state, { program }) =>
    programsAdapter.addOne(program, { ...state, loaded: true, selectedId: program.id })
  ),
  on(ProgramsPageActions.loadProgramsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return programsReducer(state, action);
}
