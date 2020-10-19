import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ProgramsActions } from './actions';
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
  on(
    ProgramsActions.loadProgramsFromInputFeatureProgramsPage,
    ProgramsActions.loadProgramsFromCreateFeatureCreatePage,
    ProgramsActions.loadProgramsFromCreateFeatureProgramsPage,
    (state) => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(ProgramsActions.loadProgramsSuccess, (state, { programs }) =>
    programsAdapter.upsertMany(programs, { ...state, loaded: true })
  ),
  on(ProgramsActions.loadProgramsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProgramsActions.selectProgramFromGuard, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(ProgramsActions.loadProgramSuccess, (state, { program }) =>
    programsAdapter.upsertOne(program, { ...state, loaded: true })
  )
);

export function reducer(state: ProgramsState | undefined, action: Action) {
  return programsReducer(state, action);
}
