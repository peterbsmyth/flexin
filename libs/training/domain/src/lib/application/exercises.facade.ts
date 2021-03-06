import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as ExercisesSelectors from '../+state/exercises/exercises.selectors';
import { TrainingState } from '../+state/state';

@Injectable({ providedIn: 'root' })
export class ExercisesFacade {
  loaded$ = this.store.pipe(select(ExercisesSelectors.getExercisesLoaded));
  allExercises$ = this.store.pipe(select(ExercisesSelectors.getAllExercises));
  allExercisesWithOneintensity$ = this.store.pipe(
    select(ExercisesSelectors.getAllExercisesWithOneIntensity)
  );
  selectedExercises$ = this.store.pipe(
    select(ExercisesSelectors.getSelectedWithSortedIntensities)
  );

  constructor(private store: Store<TrainingState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
