import { Component, OnInit } from '@angular/core';
import { BoardCardData } from '@bod/shared/models';
import {
  ExercisesFacade,
  SetStatisticsActions,
} from '@bod/training/domain';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {
  data$: Observable<BoardCardData[]>;

  constructor(
    private exerciseState: ExercisesFacade
  ) {}

  ngOnInit(): void {
    this.data$ = this.exerciseState.allExercises$.pipe(
      map((exercises) =>
        exercises.map((exercise) => ({
          exercise,
          sessionItem: null,
        }))
      )
    );

    this.exerciseState.dispatch(
      SetStatisticsActions.loadSetStatisticsWithAscendants()
    );
  }
}
