import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/root.reducer';
import * as MealsSelectors from '../+state/meals/meals.selectors';

@Injectable()
export class MealsFacade {
  loaded$ = this.store.pipe(select(MealsSelectors.getMealsLoaded));
  allMeals$ = this.store.pipe(select(MealsSelectors.getAllMeals));
  selectedMeals$ = this.store.pipe(select(MealsSelectors.getSelected));

  constructor(private store: Store<fromRoot.PartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
