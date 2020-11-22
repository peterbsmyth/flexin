import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramV2 } from '@bod/shared/models';
import {
  BoardCardData,
  V2ProgramsFacade,
  V2ExercisesFacade,
  loadDescendantsFromProgramPage,
  selectWeek,
  selectProgramFromPage,
} from '@bod/training/domain';
import { Observable, combineLatest, Subject } from 'rxjs';
import {
  filter,
  map,
  takeUntil,
  tap,
  withLatestFrom,
  take,
} from 'rxjs/operators';

@Component({
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})
export class ProgramPage implements OnInit, OnDestroy {
  programSelect = new FormControl(null);
  weekSelect = new FormControl(null);
  unsubscribe$: Subject<any> = new Subject();
  selectedWeek$: Observable<number> = this.route.queryParams.pipe(
    map((params) => +params['week'])
  );
  board$: Observable<BoardCardData[][]>;

  constructor(
    public programsState: V2ProgramsFacade,
    private exerciseState: V2ExercisesFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.queryParams
      .pipe(
        takeUntil(this.unsubscribe$),
        map((params) => +params['programId']),
        filter((id) => Number.isInteger(id)),
        tap((id) => {
          this.programsState.dispatch(selectProgramFromPage({ id }));
        })
      )
      .subscribe();
    route.queryParams
      .pipe(
        takeUntil(this.unsubscribe$),
        map((params) => +params['week']),
        tap((week) => this.programsState.dispatch(selectWeek({ week })))
      )
      .subscribe();

    this.programSelect.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((id) => {
          this.weekSelect.setValue(1);
          this.setParams(id, 1);
        })
      )
      .subscribe();

    this.weekSelect.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        withLatestFrom(this.programsState.selectedV2Programs$),
        tap(([week, program]) => this.setParams(program.id, week))
      )
      .subscribe();

    this.board$ = combineLatest([
      this.programsState.selectedV2Programs$,
      this.exerciseState.allV2Exercises$,
      this.programsState.selectedWeek$,
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
              routerLink: `/v2/programs/workouts/${workout.id}`,
              name: exercises.find(
                (exercise) => workout.exerciseId === exercise.id
              )?.name,
            }));
        });
        return boardCardData;
      })
    );
  }

  ngOnInit(): void {
    this.programsState.dispatch(
      loadDescendantsFromProgramPage({
        id: this.route.snapshot.queryParams['programId'],
      })
    );

    this.programsState.selectedV2Programs$
      .pipe(
        take(1),
        tap((program) => {
          const week = this.route.snapshot.queryParams['week'] ?? 1;
          this.programSelect.setValue(program.id, { emitEvent: false });
          this.weekSelect.setValue(+week);
          this.setParams(program.id, week);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setParams(programId: number, week: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        programId,
        week,
      },
    });
  }
}
