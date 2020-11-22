import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import { State } from '../+state/state';
import * as ProgramsSelectors from '../+state/programs/programs.selectors';
import { DraftProgramsDataService } from '../infrastructure/draft-programs.data.service';
import { Observable } from 'rxjs';
import { ProgramWithDescendants } from '../entities/component.models';

@Injectable({ providedIn: 'root' })
export class ProgramsFacade {
  loaded$ = this.store.pipe(select(ProgramsSelectors.getProgramsLoaded));
  allPrograms$ = this.store.pipe(select(ProgramsSelectors.getAllPrograms));
  selectedPrograms$ = this.store.pipe(select(ProgramsSelectors.getSelected));
  allWeeks$ = this.store.pipe(select(ProgramsSelectors.getWeeks));
  draftProgramBoard$ = this.draftProgramService.draftProgramBoard$;
  draftSessionConfiguration$ = this.draftProgramService
    .draftSessionConfiguration$;
  draftProgram$ = this.draftProgramService.draftProgram$;
  selectedProgramsWithDescendants$: Observable<
    ProgramWithDescendants
  > = this.store.pipe(select(ProgramsSelectors.getSelectedWithDescendants));

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  constructor(
    private store: Store<State>,
    private draftProgramService: DraftProgramsDataService
  ) {}
}
