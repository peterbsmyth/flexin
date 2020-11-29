import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as SetStatisticsSelectors from '../+state/set-statistics/set-statistics.selectors';
import { TrainingState } from '../+state/state';

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
