import { Component, OnInit } from '@angular/core';
import { ExercisesActions, ExercisesFacade } from '@bod/training/domain';
import { Observable } from 'rxjs';
import { Exercise, SetStatistic } from '@bod/shared/models';
import { ActivatedRoute } from '@angular/router';

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
    this.maxRepsOfAllTime$ = this.exerciseState.maxReps$;
    this.setStatistics$ = this.exerciseState.setStatistics$;
    this.bestSet$ = this.exerciseState.bestSet$;
  }

  ngOnInit(): void {
    this.exerciseState.dispatch(
      ExercisesActions.selectExercise({
        id: this.route.snapshot.params['exerciseId'],
      })
    );
  }
}
