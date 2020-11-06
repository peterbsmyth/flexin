import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as MealPlansActions from './meal-plans.actions';
import { MealPlan } from '@bod/shared/models';

export const MEALPLANS_FEATURE_KEY = 'mealPlans';

export interface MealPlansState extends EntityState<MealPlan> {
  selectedId?: string | number; // which MealPlans record has been selected
  loaded: boolean; // has the MealPlans list been loaded
  error?: string | null; // last known error (if any)
}

export const mealPlansAdapter: EntityAdapter<MealPlan> = createEntityAdapter<
  MealPlan
>();

export const initialState: MealPlansState = mealPlansAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const mealPlansReducer = createReducer(
  initialState,
  on(MealPlansActions.loadMealPlans, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(MealPlansActions.loadMealPlansSuccess, (state, { mealPlans }) =>
    mealPlansAdapter.setAll(mealPlans, { ...state, loaded: true })
  ),
  on(MealPlansActions.loadMealPlansFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: MealPlansState | undefined, action: Action) {
  return mealPlansReducer(state, action);
}
