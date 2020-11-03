import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as WorkoutStatisticsSelectors from '../+state/workout-statistics/workout-statistics.selectors';
import * as fromRoot from '../+state/root.reducer';

@Injectable()
export class WorkoutStatisticsFacade {
  loaded$ = this.store.pipe(
    select(WorkoutStatisticsSelectors.getWorkoutStatisticsLoaded)
  );
  allWorkoutStatistics$ = this.store.pipe(
    select(WorkoutStatisticsSelectors.getAllWorkoutStatistics)
  );
  selectedWorkoutStatistics$ = this.store.pipe(
    select(WorkoutStatisticsSelectors.getSelected)
  );

  constructor(private store: Store<fromRoot.PartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
