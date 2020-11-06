import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/root.reducer';
import * as MealStatisticsSelectors from '../+state/meal-statistics/meal-statistics.selectors';

@Injectable()
export class MealStatisticsFacade {
  loaded$ = this.store.pipe(
    select(MealStatisticsSelectors.getMealStatisticsLoaded)
  );
  allMealStatistics$ = this.store.pipe(
    select(MealStatisticsSelectors.getAllMealStatistics)
  );
  selectedMealStatistics$ = this.store.pipe(
    select(MealStatisticsSelectors.getSelected)
  );

  constructor(private store: Store<fromRoot.PartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
