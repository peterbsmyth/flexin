import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SetStatistic, Workout } from '@bod/shared/models';

@Component({
  selector: 'training-workout-statistic-card',
  templateUrl: './workout-statistic-card.component.html',
  styleUrls: ['./workout-statistic-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutStatisticCardComponent {
  @Input() workout: Workout;

  /**
   * hasStatistics
   * returns true if any set has reps, returns false if all sets have no reps
   * @param setStatistics
   */
  hasStatistics(setStatistics: SetStatistic[]) {
    if (!setStatistics || setStatistics.every((s) => s.reps === 0)) {
      return false;
    } else {
      return true;
    }
  }
}
