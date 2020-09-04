import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Week } from '@bod/models';
import { Observable, Subject } from 'rxjs';
import { WeeksPartialState } from '../../+state/weeks.reducer';
import { selectWeek } from '../../+state/weeks.actions';
import { getSelected } from '../../../weeks/+state/weeks.selectors';
import { ActivatedRoute } from '@angular/router';
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
    private storeWeeks: Store<WeeksPartialState>,
    private route: ActivatedRoute
  ) {
    this.week$ = this.storeWeeks
      .pipe(
        takeUntil(this.unsubscribe$),
        select(getSelected)
      );
  }

  ngOnInit(): void {
    this.storeWeeks.dispatch(selectWeek({ id: this.route.snapshot.params['weekId'] }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
