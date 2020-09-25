import { Component, OnInit } from '@angular/core';
import {
  SessionItemFormData,
  SessionItemsFacade,
  SessionItemsPageActions,
} from '@bod/coaching/domain';
import { SessionItem } from '@bod/shared/models';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './session-item.page.html',
  styleUrls: ['./session-item.page.scss'],
})
export class SessionItemPage implements OnInit {
  data$: Observable<SessionItemFormData>;
  sessionItem$: Observable<SessionItem>;

  constructor(
    private sessionItemsState: SessionItemsFacade,
  ) {
    this.data$ = this.sessionItemsState.selectedSessionItemsWithExercise$;
  }

  onSave(sessionItem: SessionItem) {
    this.sessionItemsState.dispatch(
      SessionItemsPageActions.updateSessionItem({
        sessionItem,
      })
    );
  }

  ngOnInit() {}
}
