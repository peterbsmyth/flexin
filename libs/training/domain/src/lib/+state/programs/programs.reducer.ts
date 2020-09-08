import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ProgramsPageActions } from './actions';
import { Program } from '@bod/shared/models';

export const PROGRAMS_FEATURE_KEY = 'programs';

export interface ProgramsState extends EntityState<Program> {
  selectedId?: string | number; // which Programs record has been selected
  loaded: boolean; // has the Programs list been loaded
  error?: string | null; // last none error (if any)
}

export const programsAdapter: EntityAdapter<Program> = createEntityAdapter<
  Program
>();

export const initialState: ProgramsState = programsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

export const programsReducer = createReducer(
  initialState,
  on(ProgramsPageActions.loadPrograms, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProgramsPageActions.loadProgramsSuccess, (state, { programs }) =>
    programsAdapter.setAll(programs, { ...state, loaded: true })
  ),
  on(ProgramsPageActions.loadProgramsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProgramsPageActions.selectProgram, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(ProgramsPageActions.loadProgramSuccess, (state, { program }) =>
    programsAdapter.setOne(program, { ...state, loaded: true })
  )
);

export function reducer(state: ProgramsState | undefined, action: Action) {
  return programsReducer(state, action);
}
