import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/state';
import * as V2SetStatisticsSelectors from '../+state/v2-set-statistics/v2-set-statistics.selectors';

@Injectable({ providedIn: 'root' })
export class V2SetStatisticsFacade {
  loaded$ = this.store.pipe(
    select(V2SetStatisticsSelectors.getV2SetStatisticsLoaded)
  );
  allV2SetStatistics$ = this.store.pipe(
    select(V2SetStatisticsSelectors.getAllV2SetStatistics)
  );
  selectedV2SetStatistics$ = this.store.pipe(
    select(V2SetStatisticsSelectors.getSelected)
  );

  constructor(private store: Store<fromRoot.State>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
