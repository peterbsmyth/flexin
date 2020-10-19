import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/root.reducer';
import * as SessionItemsSelectors from '../+state/session-items/session-items.selectors';

@Injectable()
export class SessionItemsFacade {
  loaded$ = this.store.pipe(
    select(SessionItemsSelectors.getSessionItemsLoaded)
  );
  allSessionItems$ = this.store.pipe(
    select(SessionItemsSelectors.getAllSessionItems)
  );
  selectedSessionItems$ = this.store.pipe(
    select(SessionItemsSelectors.getSelected)
  );
  selectedSessionItemsWithExercise$ = this.store.pipe(
    select(SessionItemsSelectors.getSelectedWithExercise)
  );
  pages$ = this.store.pipe(select(SessionItemsSelectors.getPages));

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
  constructor(private store: Store<fromRoot.PartialState>) {}
}
