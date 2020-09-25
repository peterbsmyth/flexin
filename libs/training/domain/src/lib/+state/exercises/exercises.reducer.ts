import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ExercisesApiActions } from './actions';
import { Exercise } from '@bod/shared/models';

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
  on(
    ExercisesApiActions.loadExercise,
    (state) => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(ExercisesApiActions.loadExerciseSuccess, (state, { exercise }) =>
    exercisesAdapter.upsertOne(exercise, { ...state, loaded: true })
  ),
  on(ExercisesApiActions.loadExercisesSuccess, (state, { exercises }) =>
    exercisesAdapter.upsertMany(exercises, { ...state, loaded: true })
  ),
  on(ExercisesApiActions.loadExerciseFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ExercisesApiActions.selectExercise, (state, { id }) => ({
    ...state,
    selectedId: id,
  }))
);

export function reducer(state: ExercisesState | undefined, action: Action) {
  return exercisesReducer(state, action);
}
