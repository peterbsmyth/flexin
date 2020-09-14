import { Component, OnInit } from '@angular/core';
import { SessionItemsPageActions, SessionsFacade } from '@bod/training/domain';
import { Observable } from 'rxjs';
import { Session, Pages, SessionItem } from '@bod/shared/models';
import { filter, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  session$: Observable<Session>;
  pages$: Observable<Pages>;
  sessionItems$: Observable<SessionItem[]>;
  sessionItemsLoaded$: Observable<boolean>;

  constructor(
    private sessionsState: SessionsFacade,
    private route: ActivatedRoute
  ) {
    this.session$ = this.sessionsState.selectedSessions$.pipe(
      filter((s) => !!s)
    );
    this.pages$ = this.sessionsState.pages$;
    this.sessionItems$ = this.sessionsState.allSessionItems$.pipe(
      filter((s) => !!s)
    );
    this.sessionItemsLoaded$ = this.sessionItems$.pipe(
      map((sessionItems) => sessionItems.every((s) => s))
    );
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((params) => {
          this.sessionsState.dispatch(
            SessionItemsPageActions.loadSessionItemsBySession({
              id: params['sessionId'],
            })
          );
        })
      )
      .subscribe();
  }
}
