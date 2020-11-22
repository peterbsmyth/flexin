import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import { TrainingState } from '../+state/state';
import * as WeeksSelectors from '../+state/weeks/weeks.selectors';

@Injectable({ providedIn: 'root' })
export class WeeksFacade {
  loaded$ = this.store.pipe(select(WeeksSelectors.getWeeksLoaded));
  allWeeks$ = this.store.pipe(select(WeeksSelectors.getAllWeeks));
  selectedWeeks$ = this.store.pipe(select(WeeksSelectors.getSelected));
  selectedWeekWithAscendants$ = this.store.pipe(
    select(WeeksSelectors.getSelectedWithAscendants)
  );
  allSessions$ = this.store.pipe(select(WeeksSelectors.getSessions));

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  constructor(private store: Store<TrainingState>) {}
}
