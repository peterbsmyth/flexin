import { Food } from '@bod/shared/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as FoodsActions from './foods.actions';

export const FOODS_FEATURE_KEY = 'foods';

export interface FoodsState extends EntityState<Food> {
  selectedId?: string | number; // which Foods record has been selected
  loaded: boolean; // has the Foods list been loaded
  error?: string | null; // last known error (if any)
}

export const foodsAdapter: EntityAdapter<Food> = createEntityAdapter<Food>();

export const initialState: FoodsState = foodsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const foodsReducer = createReducer(
  initialState,
  on(FoodsActions.loadFoods, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(FoodsActions.loadFoodsSuccess, (state, { foods }) =>
    foodsAdapter.setAll(foods, { ...state, loaded: true })
  ),
  on(FoodsActions.loadFoodsFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: FoodsState | undefined, action: Action) {
  return foodsReducer(state, action);
}
