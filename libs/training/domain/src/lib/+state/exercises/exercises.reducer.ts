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
>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

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
  on(
    ExercisesActions.updateExercise,
    ExercisesActions.saveExerciseSuccess,
    (state, { exercise }) =>
      exercisesAdapter.upsertOne(exercise, { ...state, loaded: true })
  ),
  on(
    ExercisesActions.saveExerciseCategorySuccess,
    (state, { exercise, category }) =>
      exercisesAdapter.updateOne(
        {
          id: exercise.id,
          changes: {
            categories: [
              ...(state.entities[exercise.id].categories ?? []),
              category,
            ],
          },
        },
        { ...state, loaded: true }
      )
  ),
  on(ExercisesActions.deleteExerciseCategory, (state, { exercise, category }) =>
    exercisesAdapter.updateOne(
      {
        id: exercise.id,
        changes: {
          categories: state.entities[exercise.id].categories.filter(
            (c) => c.id !== category.id
          ),
        },
      },
      { ...state, loaded: true }
    )
  ),
  on(ExercisesActions.saveIntensitySuccess, (state, { exercise, intensity }) =>
    exercisesAdapter.setOne(
      {
        ...exercise,
        intensities: exercise.intensities
          ? [...exercise.intensities, intensity]
          : [intensity],
      },
      {
        ...state,
        loaded: true,
      }
    )
  ),
  on(ExercisesActions.deleteIntensity, (state, { exercise, intensityId }) =>
    exercisesAdapter.updateOne(
      {
        id: exercise.id,
        changes: {
          intensities: state.entities[exercise.id].intensities.filter(
            (c) => c.id !== intensityId
          ),
        },
      },
      { ...state, loaded: true }
    )
  ),
  on(ExercisesActions.loadExercisesSuccess, (state, { exercises }) =>
    exercisesAdapter.upsertMany(exercises, { ...state, loaded: true })
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
