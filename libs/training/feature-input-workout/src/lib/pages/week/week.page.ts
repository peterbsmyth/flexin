import { Component, OnDestroy, OnInit } from '@angular/core';
import { Week } from '@bod/shared/models';
import { Observable, Subject } from 'rxjs';
import {
  WeeksFacade,
  WeekStatisticsActions,
  WeekStatisticsFacade,
} from '@bod/training/domain';
import { take, tap, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './week.page.html',
  styleUrls: ['./week.page.scss'],
})
export class WeekPage implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  week$: Observable<Week>;
  constructor(
    private weeksState: WeeksFacade,
    private weekStatisticsState: WeekStatisticsFacade,
    private snackbar: MatSnackBar
  ) {
    this.week$ = this.weeksState.selectedWeeks$;

    this.weekStatisticsState.error$
      .pipe(
        filter((error) => !!error),
        tap((error) => {
          this.snackbar.open(error, '', {
            duration: 5000,
          });
        })
      )
      .subscribe();
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
