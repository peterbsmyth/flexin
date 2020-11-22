import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/state';
import * as MealPlansSelectors from '../+state/meal-plans/meal-plans.selectors';

@Injectable()
export class MealPlansFacade {
  loaded$ = this.store.pipe(select(MealPlansSelectors.getMealPlansLoaded));
  allMealPlans$ = this.store.pipe(select(MealPlansSelectors.getAllMealPlans));
  selectedMealPlans$ = this.store.pipe(select(MealPlansSelectors.getSelected));

  constructor(private store: Store<fromRoot.State>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
