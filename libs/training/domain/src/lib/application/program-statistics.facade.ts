import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/root.reducer';
import * as ProgramStatisticsSelectors from '../+state/program-statistics/program-statistics.selectors';

@Injectable()
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

  constructor(
    private store: Store<fromRoot.PartialState>
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
