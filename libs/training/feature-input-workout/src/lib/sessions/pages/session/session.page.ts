import { Component, OnInit } from '@angular/core';
import { SessionItemsPageActions, SessionsFacade } from '@bod/training/domain';
import { Observable } from 'rxjs';
import { Session, Pages, BoardCardData } from '@bod/shared/models';
import { filter, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  session$: Observable<Session>;
  pages$: Observable<Pages>;
  boardCardData$: Observable<BoardCardData[]>;
  sessionItemsLoaded$: Observable<boolean>;

  constructor(
    private sessionsState: SessionsFacade,
    private route: ActivatedRoute
  ) {
    this.session$ = this.sessionsState.selectedSessions$.pipe(
      filter((s) => !!s)
    );
    this.pages$ = this.sessionsState.pages$;
    this.boardCardData$ = this.sessionsState.allSessionItems$.pipe(
      filter((s) => !!s),
      map(sessionItems => sessionItems.map(sessionItem => ({
        sessionItem,
        exercise: sessionItem.exercise
      })))
    );
    this.sessionItemsLoaded$ = this.boardCardData$.pipe(
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
