import { Component, OnInit } from '@angular/core';
import { Exercise } from '@bod/shared/models';
import {
  ExercisesFacade,
  SetStatisticsActions,
} from '@bod/training/domain';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {
  exercises$: Observable<Exercise[]>;

  constructor(
    private exerciseState: ExercisesFacade
  ) {}

  ngOnInit(): void {
    this.exercises$ = this.exerciseState.allExercises$;

    this.exerciseState.dispatch(
      SetStatisticsActions.loadSetStatisticsWithAscendants()
    );
  }
}
