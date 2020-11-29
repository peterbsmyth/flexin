import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
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
