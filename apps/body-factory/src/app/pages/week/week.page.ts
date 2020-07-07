import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { WeeksFeature, WeeksSelectors, WeeksActions } from '@bod/state';
import { Week } from '@bod/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'bod-week',
  templateUrl: './week.page.html',
  styleUrls: ['./week.page.scss']
})
export class WeekPage implements OnInit {
  week$: Observable<Week>;

  constructor(
    private store: Store<WeeksFeature.WeeksPartialState>
  ) {
    this.week$ = this.store
      .pipe(
        select(WeeksSelectors.getSelected)
      );
  }

  ngOnInit(): void {
    this.store.dispatch(WeeksActions.loadWeeks());
    this.store.dispatch(WeeksActions.selectWeek({ id: 1}));
  }

}
