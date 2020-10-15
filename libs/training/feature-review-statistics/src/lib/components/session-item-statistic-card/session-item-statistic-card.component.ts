import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SessionItemStatistic, SetStatistic } from '@bod/shared/models';

@Component({
  selector: 'training-session-item-statistic-card',
  templateUrl: './session-item-statistic-card.component.html',
  styleUrls: ['./session-item-statistic-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionItemStatisticCardComponent implements OnInit {
  @Input() sessionItemStatistic: SessionItemStatistic;

  constructor() { }

  ngOnInit(): void {
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
