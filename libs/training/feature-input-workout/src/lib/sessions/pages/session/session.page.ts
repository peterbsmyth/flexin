import { Component, OnInit } from '@angular/core';
import { SessionsFacade } from '@bod/training/domain';
import { Observable } from 'rxjs';
import { Session, Pages } from '@bod/shared/models';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  session$: Observable<Session>;
  pages$: Observable<Pages>;

  constructor(private sessionsState: SessionsFacade) {
    this.session$ = this.sessionsState.selectedSessions$.pipe(
      filter((s) => !!s)
    );
    this.pages$ = this.sessionsState.pages$;
  }

  ngOnInit(): void {}
}
