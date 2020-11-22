import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/state';
import * as SetStatisticsSelectors from '../+state/set-statistics/set-statistics.selectors';

@Injectable()
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

  constructor(private store: Store<fromRoot.State>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
