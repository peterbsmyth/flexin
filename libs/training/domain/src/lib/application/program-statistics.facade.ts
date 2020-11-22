import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import { State } from '../+state/state';
import * as ProgramStatisticsSelectors from '../+state/program-statistics/program-statistics.selectors';

@Injectable({ providedIn: 'root' })
export class ProgramStatisticsFacade {
  loaded$ = this.store.pipe(
    select(ProgramStatisticsSelectors.getProgramStatisticsLoaded)
  );
  allProgramStatistics$ = this.store.pipe(
    select(ProgramStatisticsSelectors.getAllProgramStatistics)
  );
  selectedProgramStatistics$ = this.store.pipe(
    select(ProgramStatisticsSelectors.getSelected)
  );

  constructor(private store: Store<State>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
