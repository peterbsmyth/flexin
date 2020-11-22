import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/state';
import * as WorkoutsSelectors from '../+state/workouts/workouts.selectors';

@Injectable()
export class WorkoutsFacade {
  loaded$ = this.store.pipe(select(WorkoutsSelectors.getWorkoutsLoaded));
  allWorkouts$ = this.store.pipe(select(WorkoutsSelectors.getAllWorkouts));
  selectedWorkouts$ = this.store.pipe(select(WorkoutsSelectors.getSelected));

  constructor(private store: Store<fromRoot.State>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
