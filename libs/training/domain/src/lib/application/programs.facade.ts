import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/root.reducer';
import * as fromPrograms from '../+state/programs/programs.reducer';
import * as ProgramsSelectors from '../+state/programs/programs.selectors';

@Injectable()
export class ProgramsFacade {
  loaded$ = this.store.pipe(
    select(ProgramsSelectors.getProgramsLoaded)
  );
  allPrograms$ = this.store.pipe(
    select(ProgramsSelectors.getAllPrograms)
  );
  selectedPrograms$ = this.store.pipe(
    select(ProgramsSelectors.getSelected)
  );
  allWeeks$ = this.store.pipe(
    select(ProgramsSelectors.getWeeks)
  )

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  constructor(
    private store: Store<fromRoot.PartialState>
  ) {}
}
