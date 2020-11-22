import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import { TrainingState } from '../+state/state';
import * as SetStatisticsSelectors from '../+state/set-statistics/set-statistics.selectors';

@Injectable({ providedIn: 'root' })
export class SetStatisticsFacade {
  loaded$ = this.store.pipe(
    select(SetStatisticsSelectors.getSetStatisticsLoaded)
  );
  allSetStatistics$ = this.store.pipe(
    select(SetStatisticsSelectors.getAllSetStatistics)
  );
  selectedSetStatistics$ = this.store.pipe(
    select(SetStatisticsSelectors.getSelected)
  );

  constructor(private store: Store<TrainingState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
