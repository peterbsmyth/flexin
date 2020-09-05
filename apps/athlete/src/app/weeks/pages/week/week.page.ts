import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Week } from '@bod/models';
import { Observable, Subject } from 'rxjs';
import { WeeksPartialState } from '../../+state/weeks.reducer';
import { getSelected } from '../../+state/weeks.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'bod-week',
  templateUrl: './week.page.html',
  styleUrls: ['./week.page.scss']
})
export class WeekPage implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  week$: Observable<Week>;

  constructor(
    private store$: Store<WeeksPartialState>
  ) {
    this.week$ = this.store$
      .pipe(
        takeUntil(this.unsubscribe$),
        select(getSelected)
      );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
