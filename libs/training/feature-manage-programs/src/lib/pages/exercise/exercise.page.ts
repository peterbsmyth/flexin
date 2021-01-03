import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mockWorkouts, SetStatistic } from '@bod/shared/models';
import { WindowRef } from '@bod/shared/utils';
import {
  ExercisesFacade,
  loadExercises,
  loadPrograms,
  ProgramsFacade,
  selectExerciseFromGuard,
} from '@bod/training/domain';
import { maxBy } from 'lodash-es';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { filter, map, take, takeUntil, tap } from 'rxjs/operators';

@Component({
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit, OnDestroy {
  unsubscribe: Subject<unknown> = new Subject();
  exerciseSelect = new FormControl(null);
  setStatistics$: Observable<SetStatistic[]>;
  maxRepsOfAllTime$: Observable<number>;
  bestSet$: Observable<SetStatistic>;
  chartData$: Observable<any>;
  chart = {
    view: [500, 300],
    // options
    showLabels: true,
    animations: true,
    xAxis: true,
    yAxis: true,
    showYAxisLabel: true,
    showXAxisLabel: true,
    xAxisLabel: 'Time',
    yAxisLabel: 'Reps',
    colorScheme: {
      domain: [
        '#5AA454',
        '#E44D25',
        '#CFC0BB',
        '#7aa3e5',
        '#a8385d',
        '#aae3f5',
      ],
    },
  };
  constructor(
    public exerciseState: ExercisesFacade,
    private programsState: ProgramsFacade,
    private route: ActivatedRoute,
    private router: Router,
    private windowRef: WindowRef
  ) {
    const workoutsO = of(mockWorkouts);
    route.queryParams
      .pipe(
        takeUntil(this.unsubscribe),
        map((params) => +params['exerciseId']),
        filter((id) => Number.isInteger(id)),
        tap((id) => {
          this.exerciseState.dispatch(selectExerciseFromGuard({ id }));
        })
      )
      .subscribe();

    this.exerciseSelect.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        tap((id) => {
          this.setParams(id);
        })
      )
      .subscribe();

    this.maxRepsOfAllTime$ = combineLatest([
      workoutsO,
      this.exerciseState.selectedExercises$,
    ]).pipe(
      map(([workouts, exercise]) =>
        workouts.find((w) => w.exerciseId === exercise?.id)
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
      this.exerciseState.selectedExercises$,
    ]).pipe(
      map(([workouts, exercise]) =>
        workouts.find((w) => w.exerciseId === exercise?.id)
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
    this.setStatistics$ = combineLatest([
      this.exerciseState.selectedExercises$,
      this.programsState.allPrograms$,
    ]).pipe(
      map(([, programs]) => {
        const setStatistics = programs.reduce(
          (acc, program) => [...acc, ...program.setStatistics],
          [] as SetStatistic[]
        );
        return setStatistics;
      })
    );
    this.chartData$ = this.setStatistics$.pipe(
      map((setStatistics) => {
        return [
          {
            name: 'Reps',
            series: setStatistics
              .filter(
                (setStatistic) => setStatistic.reps && setStatistic.set === 1
              )
              .map((setStatistic, i) => ({
                name: i,
                value: setStatistic.reps,
              })),
          },
        ];
      })
    );

    /**
     * ngx-charts width calculation
     */
    this.chart.view = [this.windowRef.nativeWindow.innerWidth - 300, 300];
  }

  ngOnInit(): void {
    this.exerciseState.dispatch(loadExercises());
    this.exerciseState.dispatch(loadPrograms());

    this.exerciseState.selectedExercises$
      .pipe(
        take(1),
        tap((exercise) => {
          this.exerciseSelect.setValue(exercise.id, { emitEvent: false });
          this.setParams(exercise.id);
        })
      )
      .subscribe();
  }

  setParams(exerciseId: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        exerciseId,
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
