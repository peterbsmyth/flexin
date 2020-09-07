import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ExercisesActions from './exercises.actions';
import { Exercise } from '@bod/shared/domain';

export const EXERCISES_FEATURE_KEY = 'exercises';

export interface State extends EntityState<Exercise> {
  selectedId?: string | number; // which Exercises record has been selected
  loaded: boolean; // has the Exercises list been loaded
  error?: string | null; // last none error (if any)
}

export interface ExercisesPartialState {
  readonly [EXERCISES_FEATURE_KEY]: State;
}

export const exercisesAdapter: EntityAdapter<Exercise> = createEntityAdapter<
  Exercise
>();

export const initialState: State = exercisesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const exercisesReducer = createReducer(
  initialState,
  on(
    ExercisesActions.saveExercise,
    ExercisesActions.loadExercises,
    (state) => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(ExercisesActions.loadExercisesSuccess, (state, { exercises }) =>
    exercisesAdapter.setAll(exercises, { ...state, loaded: true })
  ),
  on(ExercisesActions.saveExerciseSuccess, (state, { exercise }) =>
    exercisesAdapter.addOne(exercise, { ...state, loaded: true })
  ),
  on(ExercisesActions.loadExercisesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return exercisesReducer(state, action);
}
