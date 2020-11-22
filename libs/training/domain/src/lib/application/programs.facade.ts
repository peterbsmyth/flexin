import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { TrainingState } from '../+state/state';
import * as ProgramsSelectors from '../+state/programs/programs.selectors';
import { DraftProgramsDataService } from '../infrastructure/draft-programs.data.service';

@Injectable({ providedIn: 'root' })
export class ProgramsFacade {
  loaded$ = this.store.pipe(select(ProgramsSelectors.getProgramsLoaded));
  allPrograms$ = this.store.pipe(select(ProgramsSelectors.getAllPrograms));
  selectedPrograms$ = this.store.pipe(select(ProgramsSelectors.getSelected));
  weeks$ = this.store.pipe(select(ProgramsSelectors.getWeeks));
  selectedWeek$ = this.store.pipe(select(ProgramsSelectors.getSelectedWeek));
  days$ = this.store.pipe(select(ProgramsSelectors.getDays));
  selectedWorkout$ = this.store.pipe(select(ProgramsSelectors.selectedWorkout));
  daysWorkouts$ = this.store.pipe(select(ProgramsSelectors.getDaysWorkouts));
  draftProgramBoard$ = this.draftProgramService.draftProgramBoard$;
  draftProgramConfiguration$ = this.draftProgramService
    .draftProgramConfiguration$;

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  constructor(
    private store: Store<TrainingState>,
    private draftProgramService: DraftProgramsDataService
  ) {}
}
