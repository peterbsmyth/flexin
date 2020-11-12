import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProgramV2 } from '@bod/shared/models';
import {
  BoardCardData,
  V2ProgramsFacade,
  V2ExercisesFacade,
  loadDescendantsFromProgramPage,
} from '@bod/training/domain';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})
export class ProgramPage implements OnInit {
  selectedWeek$: Observable<number> = this.route.queryParams.pipe(
    map((params) => +params['week'])
  );
  program$: Observable<ProgramV2>;
  weeks$: Observable<any[]>;
  loaded$: Observable<boolean>;
  board$: Observable<BoardCardData[][]>;

  constructor(
    private programsState: V2ProgramsFacade,
    private exerciseState: V2ExercisesFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loaded$ = this.programsState.loaded$;
    this.program$ = this.programsState.selectedV2Programs$;
    this.board$ = combineLatest([
      this.program$,
      this.exerciseState.allV2Exercises$,
      this.selectedWeek$,
    ]).pipe(
      map(([program, exercises, week]) => {
        const workouts = program.workouts.filter(
          (workout) => workout.week === week
        );

        const allDays = program.workouts.map((workout) => workout.day);
        const sortedDays = [...new Set(allDays)].sort();

        const boardCardData = sortedDays.map((dayNumber) => {
          return workouts
            .filter((workout) => workout.day === dayNumber)
            .map((workout) => ({
              routerLink: `/v2/coaching/workouts/${workout.id}`,
              name: exercises.find(
                (exercise) => workout.exerciseId === exercise.id
              )?.name,
            }));
        });
        return boardCardData;
      })
    );
    this.weeks$ = this.programsState.weeks$;
  }

  navigateToWeek(week) {
    const queryParams: Params = { week };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    this.programsState.dispatch(
      loadDescendantsFromProgramPage({
        id: this.route.snapshot.params['programId'],
      })
    );

    const week = this.route.snapshot.queryParams['week'];

    if (!week) {
      this.navigateToWeek(1);
    }
  }
}
