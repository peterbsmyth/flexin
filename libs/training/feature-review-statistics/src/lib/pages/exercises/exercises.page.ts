import { Component, OnInit } from '@angular/core';
import { BoardCardData } from '@bod/shared/models';
import {
  ExercisesFacade,
  SessionItemStatisticsActions,
  SessionItemStatisticsFacade,
  SetStatisticsActions,
  SetStatisticsFacade,
} from '@bod/training/domain';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'training-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {
  data$: Observable<BoardCardData[]>;

  constructor(
    private sessionItemStatisticsState: SessionItemStatisticsFacade,
    private setStatisticsState: SetStatisticsFacade,
    private exerciseState: ExercisesFacade
  ) {}

  ngOnInit(): void {
    this.sessionItemStatisticsState.allSessionItemStatistics$
      .pipe(tap(console.dir))
      .subscribe();

    this.setStatisticsState.allSetStatistics$
      .pipe(tap(console.dir))
      .subscribe();

    this.data$ = this.exerciseState.allExercises$.pipe(
      map((exercises) =>
        exercises.map((exercise) => ({
          exercise,
          sessionItem: null,
        }))
      )
    );

    this.sessionItemStatisticsState.dispatch(
      SessionItemStatisticsActions.loadSessionItemStatistics()
    );

    this.sessionItemStatisticsState.dispatch(
      SetStatisticsActions.loadSetStatisticsWithAscendants()
    );
  }
}
