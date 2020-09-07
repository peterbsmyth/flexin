import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SessionsFacade, SessionsActions } from '@bod/training/domain';

@Component({
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public sessionsState: SessionsFacade
  ) {}

  ngOnInit(): void {
    this.sessionsState.dispatch(
      SessionsActions.loadSession({
        id: this.route.snapshot.params['sessionId'],
      })
    );
  }
}
