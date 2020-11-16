import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as V2ExercisesActions from './v2-exercises.actions';
import { ExerciseV2 } from '@bod/shared/models';

export const V2EXERCISES_FEATURE_KEY = 'v2Exercises';

export interface V2ExercisesState extends EntityState<ExerciseV2> {
  selectedId?: string | number; // which V2Exercises record has been selected
  loaded: boolean; // has the V2Exercises list been loaded
  error?: string | null; // last known error (if any)
}
export const v2ExercisesAdapter: EntityAdapter<ExerciseV2> = createEntityAdapter<
  ExerciseV2
>();

export const initialState: V2ExercisesState = v2ExercisesAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const v2ExercisesReducer = createReducer(
  initialState,
  on(V2ExercisesActions.loadV2Exercises, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(V2ExercisesActions.updateExercise, (state, { exercise }) =>
    v2ExercisesAdapter.upsertOne(exercise, { ...state, loaded: true })
  ),
  on(V2ExercisesActions.loadV2ExercisesSuccess, (state, { v2Exercises }) =>
    v2ExercisesAdapter.setAll(v2Exercises, { ...state, loaded: true })
  ),
  on(V2ExercisesActions.loadV2ExercisesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(V2ExercisesActions.selectExerciseFromGuard, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(V2ExercisesActions.loadExerciseSuccess, (state, { exercise }) =>
    v2ExercisesAdapter.upsertOne(exercise, { ...state, loaded: true })
  )
);

export function reducer(state: V2ExercisesState | undefined, action: Action) {
  return v2ExercisesReducer(state, action);
}
