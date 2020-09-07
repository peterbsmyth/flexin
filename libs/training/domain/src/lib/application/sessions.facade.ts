import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/root.reducer';
import * as fromSessions from '../+state/sessions/sessions.reducer';
import * as SessionsSelectors from '../+state/sessions/sessions.selectors';

@Injectable()
export class SessionsFacade {
  loaded$ = this.store.pipe(
    select(SessionsSelectors.getSessionsLoaded)
  );
  allSessions$ = this.store.pipe(
    select(SessionsSelectors.getAllSessions)
  );
  selectedSessions$ = this.store.pipe(
    select(SessionsSelectors.getSelected)
  );

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  constructor(
    private store: Store<fromRoot.PartialState>
  ) {}
}
