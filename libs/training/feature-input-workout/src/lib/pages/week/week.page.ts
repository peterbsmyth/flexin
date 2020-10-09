import { Component, OnInit } from '@angular/core';
import { Week } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { WeeksFacade, WeekStatisticsActions } from '@bod/training/domain';
import { take, tap } from 'rxjs/operators';

@Component({
  templateUrl: './week.page.html',
  styleUrls: ['./week.page.scss'],
})
export class WeekPage implements OnInit {
  week$: Observable<Week>;
  constructor(private weeksState: WeeksFacade) {
    this.week$ = this.weeksState.selectedWeeks$;
  }

  ngOnInit(): void {
    this.week$
      .pipe(
        take(1),
        tap((week) => {
          this.weeksState.dispatch(
            WeekStatisticsActions.loadWeekStatisticByWeek({
              week,
            })
          );
        })
      )
      .subscribe();
  }
}
