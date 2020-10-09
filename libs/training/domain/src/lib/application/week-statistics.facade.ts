import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/root.reducer';
import * as WeekStatisticsSelectors from '../+state/week-statistics/week-statistics.selectors';

@Injectable()
export class WeekStatisticsFacade {
  loaded$ = this.store.pipe(
    select(WeekStatisticsSelectors.getWeekStatisticsLoaded)
  );
  allWeekStatistics$ = this.store.pipe(
    select(WeekStatisticsSelectors.getAllWeekStatistics)
  );
  selectedWeekStatistics$ = this.store.pipe(
    select(WeekStatisticsSelectors.getSelected)
  );
  selectedWeekStatisticsWithDescendants$ = this.store.pipe(
    select(WeekStatisticsSelectors.getSelectedWithDescendants)
  );
  descendantsLoaded$ = this.store.pipe(
    select(WeekStatisticsSelectors.getWeekStatisticsDescendantsLoaded)
  );

  constructor(private store: Store<fromRoot.PartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
