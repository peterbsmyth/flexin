import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/root.reducer';
import * as ProgramsSelectors from '../+state/programs/programs.selectors';
import { DraftProgramsDataService } from '../infrastructure/draft-programs.data.service';

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
  draftIncompleteSessionItems$ = this.draftProgramService.incompleteSessionItems$;
  draftProgram$ = this.draftProgramService.draftProgram$;

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  constructor(
    private store: Store<fromRoot.PartialState>,
    private draftProgramService: DraftProgramsDataService
  ) {}
}
