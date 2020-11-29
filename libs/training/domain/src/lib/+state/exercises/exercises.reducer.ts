import { Exercise } from '@bod/shared/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as ExercisesActions from './exercises.actions';

export const EXERCISES_FEATURE_KEY = 'exercises';

export interface ExercisesState extends EntityState<Exercise> {
  selectedId?: string | number; // which Exercises record has been selected
  loaded: boolean; // has the Exercises list been loaded
  error?: string | null; // last known error (if any)
}
export const exercisesAdapter: EntityAdapter<Exercise> = createEntityAdapter<
  Exercise
>();

export const initialState: ExercisesState = exercisesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const exercisesReducer = createReducer(
  initialState,
  on(ExercisesActions.loadExercises, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ExercisesActions.updateExercise, (state, { exercise }) =>
    exercisesAdapter.upsertOne(exercise, { ...state, loaded: true })
  ),
  on(ExercisesActions.loadExercisesSuccess, (state, { exercises }) =>
    exercisesAdapter.setAll(exercises, { ...state, loaded: true })
  ),
  on(ExercisesActions.loadExercisesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ExercisesActions.selectExerciseFromGuard, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(ExercisesActions.loadExerciseSuccess, (state, { exercise }) =>
    exercisesAdapter.upsertOne(exercise, { ...state, loaded: true })
  )
);

export function reducer(state: ExercisesState | undefined, action: Action) {
  return exercisesReducer(state, action);
}
