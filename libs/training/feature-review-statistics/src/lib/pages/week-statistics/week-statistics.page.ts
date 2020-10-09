import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { WeekStatistic } from '@bod/shared/models';
import { WeekStatisticsFacade } from '@bod/training/domain';
import { Observable, of } from 'rxjs';
import { take, tap, filter } from 'rxjs/operators';
import { mock } from './mock';

@Component({
  templateUrl: './week-statistics.page.html',
  styleUrls: ['./week-statistics.page.scss'],
})
export class WeekStatisticsPage implements OnInit, AfterViewInit {
  weekStatistic$: Observable<WeekStatistic>;

  @ViewChild('player') player: ElementRef;
  constructor(private weekStatisticsState: WeekStatisticsFacade) {
    /**
     * TODO: re-enable after done making the view
     */
    this.weekStatistic$ = this.weekStatisticsState.selectedWeekStatisticsWithDescendants$.pipe(
      filter((data) => !!data)
    );

    // this.weekStatistic$ = of(mock);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.weekStatisticsState.selectedWeekStatisticsWithDescendants$
      // of(mock)
      .pipe(
        filter((data) => !!data),
        take(1),
        tap((weekStatistic) => {
          const PLAYLIST_URL =
            'https://www.youtube.com/embed/videoseries?list=';
          this.player.nativeElement.src = `${PLAYLIST_URL}${weekStatistic.playlist}`;
        })
      )
      .subscribe();
  }
}
