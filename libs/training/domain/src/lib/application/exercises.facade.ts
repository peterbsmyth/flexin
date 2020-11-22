import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import { TrainingState } from '../+state/state';
import * as ExercisesSelectors from '../+state/exercises/exercises.selectors';

@Injectable({ providedIn: 'root' })
export class ExercisesFacade {
  loaded$ = this.store.pipe(select(ExercisesSelectors.getExercisesLoaded));
  allExercises$ = this.store.pipe(select(ExercisesSelectors.getAllExercises));
  selectedExercises$ = this.store.pipe(select(ExercisesSelectors.getSelected));

  constructor(private store: Store<TrainingState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
