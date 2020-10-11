import { Component, OnInit } from '@angular/core';
import { ExercisesActions, ExercisesFacade } from '@bod/training/domain';
import { Observable } from 'rxjs';
import { Exercise, SetStatistic } from '@bod/shared/models';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { WindowRef } from '../../window-ref.service';

@Component({
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  exercise$: Observable<Exercise>;
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
    private exerciseState: ExercisesFacade,
    private route: ActivatedRoute,
    private windowRef: WindowRef
  ) {
    this.exercise$ = this.exerciseState.selectedExercises$;
    this.maxRepsOfAllTime$ = this.exerciseState.maxReps$;
    this.setStatistics$ = this.exerciseState.setStatistics$;
    this.bestSet$ = this.exerciseState.bestSet$;
    this.chartData$ = this.exerciseState.setStatistics$.pipe(
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
    this.chart.view = [this.windowRef.nativeWindow.innerWidth, 300];
  }

  ngOnInit(): void {
    this.exerciseState.dispatch(
      ExercisesActions.selectExercise({
        id: this.route.snapshot.params['exerciseId'],
      })
    );
  }
}
