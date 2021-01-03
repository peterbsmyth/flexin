import { Component } from '@angular/core';
import { mockWorkouts, SetStatistic } from '@bod/shared/models';
import { ProgramsFacade } from '@bod/training/domain';
import { maxBy } from 'lodash-es';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'training-statistics',
  templateUrl: './statistics.container.html',
  styleUrls: ['./statistics.container.scss'],
})
export class StatisticsContainer {
  loaded$: Observable<boolean>;
  setStatistics$: Observable<SetStatistic[]>;
  maxRepsOfAllTime$: Observable<number>;
  bestSet$: Observable<SetStatistic>;
  constructor(private programState: ProgramsFacade) {
    const workoutsO = of(mockWorkouts);
    // this.loaded$ = this.setStatisticsState.ascendantsLoaded$;
    // this.exercise$ = this.exerciseState.selectedExercises$;
    this.maxRepsOfAllTime$ = combineLatest([
      workoutsO,
      this.programState.selectedWorkout$,
    ]).pipe(
      map(([workouts, workout]) =>
        workouts.find((w) => w.exerciseId === workout?.exerciseId)
      ),
      filter((w) => !!w),
      map(({ setStatistics }) => {
        const data = setStatistics
          .filter((stat) => !!stat.reps)
          .map((stat) => stat.reps);
        if (data.length) {
          return Math.max.apply(null, data);
        } else {
          return 0;
        }
      })
    );
    this.bestSet$ = combineLatest([
      workoutsO,
      this.programState.selectedWorkout$,
    ]).pipe(
      map(([workouts, workout]) =>
        workouts.find((w) => w.exerciseId === workout?.exerciseId)
      ),
      filter((w) => !!w),
      map(({ setStatistics }) => {
        const maxWeight = Math.max.apply(
          null,
          setStatistics.map((stat) => stat.weight)
        );
        const topWeights = setStatistics.filter((s) => s.weight === maxWeight);
        const bestSet: SetStatistic = topWeights.length
          ? maxBy(topWeights, 'reps')
          : null;

        if (bestSet?.weight === 0) {
          return null;
        } else {
          return bestSet;
        }
      })
    );
  }
}
