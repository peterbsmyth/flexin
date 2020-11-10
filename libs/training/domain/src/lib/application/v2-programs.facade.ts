import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/root.reducer';
import * as V2ProgramsSelectors from '../+state/v2-programs/v2-programs.selectors';
import { DraftProgramsDataService } from '../infrastructure/draft-programs.data.service';
import { V2DraftProgramsDataService } from '../infrastructure/v2-draft-programs.data.service';

@Injectable()
export class V2ProgramsFacade {
  loaded$ = this.store.pipe(select(V2ProgramsSelectors.getV2ProgramsLoaded));
  allV2Programs$ = this.store.pipe(
    select(V2ProgramsSelectors.getAllV2Programs)
  );
  selectedV2Programs$ = this.store.pipe(
    select(V2ProgramsSelectors.getSelected)
  );
  draftProgramBoard$ = this.draftProgramService.draftProgramBoard$;
  draftProgramConfiguration$ = this.draftProgramService
    .draftProgramConfiguration$;

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  constructor(
    private store: Store<fromRoot.PartialState>,
    private draftProgramService: V2DraftProgramsDataService
  ) {}
}
