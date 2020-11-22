import { Component, OnInit } from '@angular/core';
import { mockWorkouts, SetStatisticV2 } from '@bod/shared/models';

import { Observable, of, combineLatest } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { maxBy } from 'lodash-es';
import { V2ProgramsFacade } from '@bod/training/domain';

@Component({
  selector: 'training-statistics',
  templateUrl: './statistics.container.html',
  styleUrls: ['./statistics.container.scss'],
})
export class StatisticsContainer implements OnInit {
  loaded$: Observable<boolean>;
  setStatistics$: Observable<SetStatisticV2[]>;
  maxRepsOfAllTime$: Observable<number>;
  bestSet$: Observable<SetStatisticV2>;
  constructor(private programState: V2ProgramsFacade) {
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
        const bestSet: SetStatisticV2 = topWeights.length
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

  ngOnInit(): void {}
}
