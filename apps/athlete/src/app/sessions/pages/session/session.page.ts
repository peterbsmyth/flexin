import { Component, OnInit, OnDestroy } from '@angular/core';
import { Week, Session } from '@bod/models';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { WeekService } from '@bod/data';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SessionsPartialState } from '../../+state/sessions.reducer';
import { getSelected } from '../../+state/sessions.selectors';
import { selectSession } from '@athlete/sessions/+state/sessions.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit, OnDestroy {
  session$: Observable<Session>;
  unsubscribe$: Subject<any> = new Subject();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store$: Store<SessionsPartialState>
  ) {
    this.session$ = this.store$.pipe(
      takeUntil(this.unsubscribe$),
      select(getSelected)
    );
  }

  ngOnInit(): void {
    this.store$.dispatch(
      selectSession({ id: this.route.snapshot.params['sessionId'] })
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
