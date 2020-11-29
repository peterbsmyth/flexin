import { Meal } from '@bod/shared/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as MealsActions from './meals.actions';

export const MEALS_FEATURE_KEY = 'meals';

export interface MealsState extends EntityState<Meal> {
  selectedId?: string | number; // which Meals record has been selected
  loaded: boolean; // has the Meals list been loaded
  error?: string | null; // last known error (if any)
}

export const mealsAdapter: EntityAdapter<Meal> = createEntityAdapter<Meal>();

export const initialState: MealsState = mealsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const mealsReducer = createReducer(
  initialState,
  on(MealsActions.loadMeals, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(MealsActions.loadMealsSuccess, (state, { meals }) =>
    mealsAdapter.setAll(meals, { ...state, loaded: true })
  ),
  on(MealsActions.loadMealsFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: MealsState | undefined, action: Action) {
  return mealsReducer(state, action);
}
