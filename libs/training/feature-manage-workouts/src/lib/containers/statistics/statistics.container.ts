import { Component, OnInit } from '@angular/core';
import { Exercise, SetStatistic } from '@bod/shared/models';
import {
  ExercisesFacade,
  SetStatisticsActions,
  SetStatisticsFacade,
} from '@bod/training/domain';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'training-statistics',
  templateUrl: './statistics.container.html',
  styleUrls: ['./statistics.container.scss'],
})
export class StatisticsContainer implements OnInit {
  loaded$: Observable<boolean>;
  exercise$: Observable<Exercise>;
  setStatistics$: Observable<SetStatistic[]>;
  maxRepsOfAllTime$: Observable<number>;
  bestSet$: Observable<SetStatistic>;
  constructor(
    private setStatisticsState: SetStatisticsFacade,
    private exerciseState: ExercisesFacade
  ) {
    this.loaded$ = this.setStatisticsState.ascendantsLoaded$;
    this.exercise$ = this.exerciseState.selectedExercises$;
    this.maxRepsOfAllTime$ = this.exerciseState.maxReps$;
    this.bestSet$ = this.exerciseState.bestSet$;
  }

  ngOnInit(): void {
    /**
     * the purpose of this subscription is to enforce that the action dispatches only once per application load
     */
    this.loaded$
      .pipe(
        tap((loaded) => {
          if (loaded === undefined) {
            this.setStatisticsState.dispatch(
              SetStatisticsActions.loadSetStatisticsWithAscendants()
            );
          }
        })
      )
      .subscribe();
  }
}
