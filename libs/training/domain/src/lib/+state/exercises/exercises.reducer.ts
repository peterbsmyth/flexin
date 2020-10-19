import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ExercisesActions } from './actions';
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
    ExercisesActions.loadExerciseFromInputFeatureSessionItemPage,
    ExercisesActions.loadExerciseFromGuard,
    ExercisesActions.saveExerciseFromPage,
    ExercisesActions.loadExercisesFromPage,
    ExercisesActions.loadExercisesFromProgramBoardPage,
    ExercisesActions.loadExercisesFromSessionItemPage,
    (state) => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(
    ExercisesActions.updateExerciseFromPage,
    ExercisesActions.updateExerciseFromSessionPage,
    ExercisesActions.loadExerciseSuccess,
    (state, { exercise }) =>
      exercisesAdapter.upsertOne(exercise, { ...state, loaded: true })
  ),
  on(ExercisesActions.loadExercisesSuccess, (state, { exercises }) =>
    exercisesAdapter.upsertMany(exercises, { ...state, loaded: true })
  ),
  on(
    ExercisesActions.loadExercisesFailure,
    ExercisesActions.loadExerciseFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  ),
  on(
    ExercisesActions.selectExerciseFromGuard,
    ExercisesActions.selectExerciseFromInputFeatureExercisePage,
    ExercisesActions.selectExerciseFromInputFeatureSessionItemPage,
    (state, { id }) => ({
      ...state,
      selectedId: id,
    })
  ),
  on(ExercisesActions.saveExerciseSuccess, (state, { exercise }) =>
    exercisesAdapter.addOne(exercise, { ...state, loaded: true })
  )
);

export function reducer(state: ExercisesState | undefined, action: Action) {
  return exercisesReducer(state, action);
}
