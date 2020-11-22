import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/state';
import * as V2ExercisesSelectors from '../+state/v2-exercises/v2-exercises.selectors';

@Injectable()
export class V2ExercisesFacade {
  loaded$ = this.store.pipe(select(V2ExercisesSelectors.getV2ExercisesLoaded));
  allV2Exercises$ = this.store.pipe(
    select(V2ExercisesSelectors.getAllV2Exercises)
  );
  selectedV2Exercises$ = this.store.pipe(
    select(V2ExercisesSelectors.getSelected)
  );

  constructor(private store: Store<fromRoot.State>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
