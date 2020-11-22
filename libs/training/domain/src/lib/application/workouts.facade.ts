import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import { TrainingState } from '../+state/state';
import * as WorkoutsSelectors from '../+state/workouts/workouts.selectors';

@Injectable({ providedIn: 'root' })
export class WorkoutsFacade {
  loaded$ = this.store.pipe(select(WorkoutsSelectors.getWorkoutsLoaded));
  allWorkouts$ = this.store.pipe(select(WorkoutsSelectors.getAllWorkouts));
  selectedWorkouts$ = this.store.pipe(select(WorkoutsSelectors.getSelected));

  constructor(private store: Store<TrainingState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
