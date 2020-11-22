import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import { TrainingState } from '../+state/state';
import * as MealsSelectors from '../+state/meals/meals.selectors';

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
