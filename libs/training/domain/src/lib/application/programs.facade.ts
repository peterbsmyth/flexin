import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as ProgramsSelectors from '../+state/programs/programs.selectors';
import { TrainingState } from '../+state/state';
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
  workoutFormData$ = this.store.pipe(
    select(ProgramsSelectors.getWorkoutFormData)
  );
  board$ = this.store.pipe(select(ProgramsSelectors.getBoard));

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  constructor(
    private store: Store<TrainingState>,
    private draftProgramService: DraftProgramsDataService
  ) {}
}
