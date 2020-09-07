import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Week, Session } from '@bod/shared/domain';
import { Observable, Subject, combineLatest } from 'rxjs';
import { WeeksPartialState } from '../../+state/weeks.reducer';
import { getSelected, getSessions } from '../../+state/weeks.selectors';
import { takeUntil, map, filter } from 'rxjs/operators';

@Component({
  selector: 'bod-week',
  templateUrl: './week.page.html',
  styleUrls: ['./week.page.scss']
})
export class WeekPage implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  week$: Observable<Week>;
  sessions$: Observable<Session[]>;
  sessionsLoaded$: Observable<boolean>;

  constructor(
    private store$: Store<WeeksPartialState>
  ) {
    this.week$ = this.store$
      .pipe(
        takeUntil(this.unsubscribe$),
        select(getSelected),
        filter(w => !!w)
      );
    this.sessions$ = this.store$
      .pipe(
        takeUntil(this.unsubscribe$),
        select(getSessions),
        filter(w => !!w)
      );

    this.sessionsLoaded$ = this.sessions$
      .pipe(
        map((sessions) => sessions.every(s => s))
      );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
