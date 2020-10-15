import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { SetStatistic, WeekStatistic } from '@bod/shared/models';
import { WeekStatisticsFacade } from '@bod/training/domain';
import { Observable } from 'rxjs';
import { take, tap, filter } from 'rxjs/operators';

@Component({
  templateUrl: './week-statistics.page.html',
  styleUrls: ['./week-statistics.page.scss'],
})
export class WeekStatisticsPage implements OnInit, AfterViewInit {
  weekStatistic$: Observable<WeekStatistic>;

  @ViewChild('player') player: ElementRef;
  constructor(private weekStatisticsState: WeekStatisticsFacade) {
    this.weekStatistic$ = this.weekStatisticsState.selectedWeekStatisticsWithDescendants$.pipe(
      filter((data) => !!data)
    );
  }

  ngOnInit(): void {}

  /**
   * ngAfterViewInit
   * after the view is initialized then attach the playlist to the player, if it exists
   */
  ngAfterViewInit() {
    this.weekStatisticsState.selectedWeekStatisticsWithDescendants$
      .pipe(
        filter((data) => !!data),
        take(1),
        tap((weekStatistic) => {
          if (weekStatistic.playlist) {
            const PLAYLIST_URL =
              'https://www.youtube.com/embed/videoseries?list=';
            this.player.nativeElement.src = `${PLAYLIST_URL}${weekStatistic.playlist}`;
          }
        })
      )
      .subscribe();
  }

  /**
   * hasStatistics
   * returns true if any set has reps, returns false if all sets have no reps
   * @param setStatistics
   */
  hasStatistics(setStatistics: SetStatistic[]) {
    if (!setStatistics || setStatistics.every(s => s.reps === 0)) {
      return false;
    } else {
      return true;
    }
  }
}
