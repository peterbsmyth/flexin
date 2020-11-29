import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as MealsSelectors from '../+state/meals/meals.selectors';
import { TrainingState } from '../+state/state';

@Injectable({ providedIn: 'root' })
export class MealsFacade {
  loaded$ = this.store.pipe(select(MealsSelectors.getMealsLoaded));
  allMeals$ = this.store.pipe(select(MealsSelectors.getAllMeals));
  selectedMeals$ = this.store.pipe(select(MealsSelectors.getSelected));

  constructor(private store: Store<TrainingState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
