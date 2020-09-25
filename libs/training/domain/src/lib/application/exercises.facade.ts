import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/root.reducer';
import * as ExercisesSelectors from '../+state/exercises/exercises.selectors';

@Injectable()
export class ExercisesFacade {
  loaded$ = this.store.pipe(select(ExercisesSelectors.getExercisesLoaded));
  allExercises$ = this.store.pipe(select(ExercisesSelectors.getAllExercises));
  selectedExercises$ = this.store.pipe(select(ExercisesSelectors.getSelected));
  setStatistics$ = this.store.pipe(select(ExercisesSelectors.getSetStatistics));

  constructor(private store: Store<fromRoot.PartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
