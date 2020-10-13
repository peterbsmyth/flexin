import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  SessionItemsActions,
  SessionsFacade,
  SessionsActions,
  SessionStatisticsActions,
  WeeksPageActions,
} from '@bod/training/domain';
import { Observable, Subject } from 'rxjs';
import { Session, Pages, SessionItem } from '@bod/shared/models';
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
  sessionItems$: Observable<SessionItem[]>;
  sessionItemsLoaded$: Observable<boolean>;

  constructor(
    private sessionsState: SessionsFacade,
    private route: ActivatedRoute
  ) {
    this.session$ = this.sessionsState.selectedSessionsWithAscendants$.pipe(
      filter((s) => {
        return !!s?.week?.program;
      }),
      distinctUntilKeyChanged('id')
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
    this.session$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((session) => {
          this.sessionsState.dispatch(
            SessionsActions.loadSessionsByWeek({ id: session.weekId })
          );
          this.sessionsState.dispatch(
            WeeksPageActions.selectWeek({ id: session.weekId })
          );
        })
      )
      .subscribe();
    this.session$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((session) => {
          this.sessionsState.dispatch(
            SessionStatisticsActions.loadSessionStatisticBySession({ session })
          );

          this.sessionsState.dispatch(
            SessionItemsActions.loadSessionItemsBySession({
              id: session.id,
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
