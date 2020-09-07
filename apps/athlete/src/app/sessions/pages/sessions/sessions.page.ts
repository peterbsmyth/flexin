import { Component, OnInit, OnDestroy } from '@angular/core';
import { Session } from '@bod/shared/domain';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { SessionsPartialState } from '../../+state/sessions.reducer';
import { getAllSessions } from '../../+state/sessions.selectors';

@Component({
  selector: 'bod-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss']
})
export class SessionsPage implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  sessions$: Observable<Session[]>;
  constructor(
    private store: Store<SessionsPartialState>,
  ) {
  }

  ngOnInit(): void {
    this.sessions$ = this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(getAllSessions)
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
