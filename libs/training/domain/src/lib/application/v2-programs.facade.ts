import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { TrainingState } from '../+state/state';
import * as V2ProgramsSelectors from '../+state/v2-programs/v2-programs.selectors';
import { V2DraftProgramsDataService } from '../infrastructure/v2-draft-programs.data.service';

@Injectable({ providedIn: 'root' })
export class V2ProgramsFacade {
  loaded$ = this.store.pipe(select(V2ProgramsSelectors.getV2ProgramsLoaded));
  allV2Programs$ = this.store.pipe(
    select(V2ProgramsSelectors.getAllV2Programs)
  );
  selectedV2Programs$ = this.store.pipe(
    select(V2ProgramsSelectors.getSelected)
  );
  weeks$ = this.store.pipe(select(V2ProgramsSelectors.getWeeks));
  selectedWeek$ = this.store.pipe(select(V2ProgramsSelectors.getSelectedWeek));
  days$ = this.store.pipe(select(V2ProgramsSelectors.getDays));
  selectedWorkout$ = this.store.pipe(
    select(V2ProgramsSelectors.selectedWorkout)
  );
  daysWorkouts$ = this.store.pipe(select(V2ProgramsSelectors.getDaysWorkouts));
  draftProgramBoard$ = this.draftProgramService.draftProgramBoard$;
  draftProgramConfiguration$ = this.draftProgramService
    .draftProgramConfiguration$;

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  constructor(
    private store: Store<TrainingState>,
    private draftProgramService: V2DraftProgramsDataService
  ) {}
}
