import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/root.reducer';
import * as SessionItemStatisticsSelectors from '../+state/session-item-statistics/session-item-statistics.selectors';

@Injectable()
export class SessionItemStatisticsFacade {
  loaded$ = this.store.pipe(
    select(SessionItemStatisticsSelectors.getSessionItemStatisticsLoaded)
  );
  allSessionItemStatistics$ = this.store.pipe(
    select(SessionItemStatisticsSelectors.getAllSessionItemStatistics)
  );
  selectedSessionItemStatistics$ = this.store.pipe(
    select(SessionItemStatisticsSelectors.getSelected)
  );
  setStatistics$ = this.store.pipe(
    select(SessionItemStatisticsSelectors.getSetStatistics)
  );

  constructor(
    private store: Store<fromRoot.PartialState>
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
