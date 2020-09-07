import { Component, OnInit } from '@angular/core';
import { SessionsFacade, SessionsActions } from '@bod/training/domain';

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
    this.sessionsState.dispatch(SessionsActions.loadSessions());
  }
}
