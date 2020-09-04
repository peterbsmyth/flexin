import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Week } from '@bod/models';
import { Observable } from 'rxjs';
import { WeeksPartialState } from '../../+state/weeks.reducer';
import { loadWeeks, selectWeek } from '../../+state/weeks.actions';
import { getSelected } from '../../../weeks/+state/weeks.selectors';

@Component({
  selector: 'bod-week',
  templateUrl: './week.page.html',
  styleUrls: ['./week.page.scss']
})
export class WeekPage implements OnInit {
  week$: Observable<Week>;

  constructor(
    private storeWeeks: Store<WeeksPartialState>,
  ) {
    this.week$ = this.storeWeeks
      .pipe(
        select(getSelected)
      );
  }

  ngOnInit(): void {
    this.storeWeeks.dispatch(loadWeeks());
    this.storeWeeks.dispatch(selectWeek({ id: 1 }));
  }

}
