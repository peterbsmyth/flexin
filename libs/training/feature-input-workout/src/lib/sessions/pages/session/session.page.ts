import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  SessionItemsPageActions,
  SessionsFacade,
  SessionsPageActions,
  WeeksPageActions,
} from '@bod/training/domain';
import { Observable, Subject } from 'rxjs';
import { Session, Pages, BoardCardData } from '@bod/shared/models';
import {
  filter,
  map,
  tap,
  takeUntil,
  distinctUntilKeyChanged,
} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  session$: Observable<Session>;
  pages$: Observable<Pages>;
  boardCardData$: Observable<BoardCardData[]>;
  sessionItemsLoaded$: Observable<boolean>;

  constructor(
    private sessionsState: SessionsFacade,
    private route: ActivatedRoute
  ) {
    this.session$ = this.sessionsState.selectedSessions$.pipe(
      filter((s) => !!s),
      distinctUntilKeyChanged('id')
    );
    this.pages$ = this.sessionsState.pages$;
    this.boardCardData$ = this.sessionsState.allSessionItems$.pipe(
      filter((s) => !!s),
      map((sessionItems) =>
        sessionItems.map((sessionItem) => ({
          sessionItem,
          exercise: sessionItem.exercise,
        }))
      )
    );
    this.sessionItemsLoaded$ = this.boardCardData$.pipe(
      map((sessionItems) => sessionItems.every((s) => s))
    );
  }

  ngOnInit(): void {
    this.session$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((session) => {
          this.sessionsState.dispatch(
            SessionsPageActions.loadSessionsByWeek({ id: session.weekId })
          );
          this.sessionsState.dispatch(
            WeeksPageActions.selectWeek({ id: session.weekId })
          );
        })
      )
      .subscribe();
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
