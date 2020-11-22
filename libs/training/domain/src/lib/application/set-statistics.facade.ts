import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import { State } from '../+state/state';
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
  ascendantsLoaded$ = this.store.pipe(
    select(SetStatisticsSelectors.getSetStatisticsAscendantsLoaded)
  );

  constructor(private store: Store<State>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
