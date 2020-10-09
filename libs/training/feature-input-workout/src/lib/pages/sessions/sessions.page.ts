import { Component, OnInit } from '@angular/core';
import { WeeksFacade, SessionsActions } from '@bod/training/domain';
import { Observable } from 'rxjs';
import { Session } from '@bod/shared/models';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
  sessions$: Observable<Session[]>;
  sessionsLoaded$: Observable<boolean>;

  constructor(public weeksState: WeeksFacade, private route: ActivatedRoute) {
    this.sessions$ = this.weeksState.allSessions$.pipe(filter((w) => !!w));
    this.sessionsLoaded$ = this.sessions$.pipe(
      map((sessions) => sessions.every((s) => s))
    );
  }

  ngOnInit(): void {
    this.weeksState.dispatch(
      SessionsActions.loadSessionsByWeek({
        id: this.route.snapshot.params['weekId'],
      })
    );
  }
}
