import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import { State } from '../+state/state';
import * as SessionItemStatisticsSelectors from '../+state/session-item-statistics/session-item-statistics.selectors';

@Injectable({ providedIn: 'root' })
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

  constructor(private store: Store<State>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
