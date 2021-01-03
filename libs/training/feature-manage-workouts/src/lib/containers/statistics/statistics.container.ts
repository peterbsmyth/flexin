import { Component, OnDestroy } from '@angular/core';
import { SetStatistic } from '@bod/shared/models';
import {
  getWorkoutsWhereExerciseId,
  ProgramsFacade,
  WorkoutsFacade,
} from '@bod/training/domain';
import { maxBy } from 'lodash-es';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'training-statistics',
  templateUrl: './statistics.container.html',
  styleUrls: ['./statistics.container.scss'],
})
export class StatisticsContainer implements OnDestroy {
  unsubscribe: Subject<unknown> = new Subject();
  loaded$: Observable<boolean>;
  setStatistics$: Observable<SetStatistic[]>;
  maxRepsOfAllTime$: Observable<number>;
  bestSet$: Observable<SetStatistic>;
  constructor(
    public programState: ProgramsFacade,
    private workoutState: WorkoutsFacade
  ) {
    this.programState.selectedWorkout$
      .pipe(
        takeUntil(this.unsubscribe),
        filter((workout) => !!workout),
        tap((workout) => {
          this.programState.dispatch(
            getWorkoutsWhereExerciseId({ exerciseId: workout.exerciseId })
          );
        })
      )
      .subscribe();

    this.maxRepsOfAllTime$ = this.workoutState.allWorkouts$.pipe(
      map((workouts) => workouts.flatMap((w) => w.setStatistics)),
      filter((w) => !!w),
      map((setStatistics) => {
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

    this.bestSet$ = this.workoutState.allWorkouts$.pipe(
      map((workouts) => workouts.flatMap((w) => w.setStatistics)),
      filter((w) => !!w),
      map((setStatistics) => {
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

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
