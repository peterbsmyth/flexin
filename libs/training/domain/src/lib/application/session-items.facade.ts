import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromSessionItems from '../+state/session-items/session-items.reducer';
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

  constructor(
    private store: Store<fromSessionItems.SessionItemsPartialState>
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
