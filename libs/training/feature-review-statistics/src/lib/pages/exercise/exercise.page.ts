import { Component, OnInit } from '@angular/core';
import { ExercisesActions, ExercisesFacade } from '@bod/training/domain';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Exercise, SetStatistic } from '@bod/shared/models';
import { map } from 'rxjs/operators';
import { maxBy } from 'lodash-es';

@Component({
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  exercise$: Observable<Exercise>;
  setStatistics$: Observable<SetStatistic[]>;
  maxRepsOfAllTime$: Observable<number>;
  bestSet$: Observable<SetStatistic>;
  constructor(
    private exerciseState: ExercisesFacade,
    private route: ActivatedRoute
  ) {
    this.exercise$ = this.exerciseState.selectedExercises$;
    this.setStatistics$ = this.exerciseState.setStatistics$;
    this.maxRepsOfAllTime$ = this.setStatistics$.pipe(
      map((setStatistics) => {
        return Math.max.apply(
          null,
          setStatistics.map((stat) => stat.reps)
        );
      })
    );
    this.bestSet$ = this.setStatistics$.pipe(
      map((setStatistics) => {
        const maxWeight = Math.max.apply(
          null,
          setStatistics.map((stat) => stat.weight)
        );
        const topWeights = setStatistics.filter((s) => s.weight === maxWeight);
        const bestSet: SetStatistic = maxBy(topWeights, 'reps');
        return bestSet;
      })
    );
    this.exerciseState.dispatch(
      ExercisesActions.selectExercise({
        id: this.route.snapshot.params['exerciseId'],
      })
    );
  }

  ngOnInit(): void {}
}
