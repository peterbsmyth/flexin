import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as MealPlansSelectors from '../+state/meal-plans/meal-plans.selectors';
import { TrainingState } from '../+state/state';

@Injectable({ providedIn: 'root' })
export class MealPlansFacade {
  loaded$ = this.store.pipe(select(MealPlansSelectors.getMealPlansLoaded));
  allMealPlans$ = this.store.pipe(select(MealPlansSelectors.getAllMealPlans));
  selectedMealPlans$ = this.store.pipe(select(MealPlansSelectors.getSelected));

  constructor(private store: Store<TrainingState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
