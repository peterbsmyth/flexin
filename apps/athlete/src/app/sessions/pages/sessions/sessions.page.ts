import { Component, OnInit } from '@angular/core';
import { SessionsFacade, SessionsPageActions } from '@bod/training/domain';

@Component({
  selector: 'bod-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss']
})
export class SessionsPage implements OnInit {
  constructor(
    public sessionsState: SessionsFacade,
  ) {
  }

  ngOnInit(): void {
    this.sessionsState.dispatch(SessionsPageActions.loadSessions());
  }
}
