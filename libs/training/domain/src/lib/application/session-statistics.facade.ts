import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import { TrainingState } from '../+state/state';
import * as SessionStatisticsSelectors from '../+state/session-statistics/session-statistics.selectors';

@Injectable({ providedIn: 'root' })
export class SessionStatisticsFacade {
  loaded$ = this.store.pipe(
    select(SessionStatisticsSelectors.getSessionStatisticsLoaded)
  );
  allSessionStatistics$ = this.store.pipe(
    select(SessionStatisticsSelectors.getAllSessionStatistics)
  );
  selectedSessionStatistics$ = this.store.pipe(
    select(SessionStatisticsSelectors.getSelected)
  );

  constructor(private store: Store<TrainingState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
