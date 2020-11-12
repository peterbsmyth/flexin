import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProgramV2 } from '@bod/shared/models';
import {
  V2ProgramsFacade,
  selectWeek,
  selectDay,
  selectWorkout,
  selectProgramFromPage,
} from '@bod/training/domain';
import { Subject } from 'rxjs';
import {
  map,
  take,
  takeUntil,
  tap,
  filter,
  withLatestFrom,
} from 'rxjs/operators';

@Component({
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit, OnDestroy {
  programSelect = new FormControl(null);
  weekSelect = new FormControl(null);
  daySelect = new FormControl(null);
  unsubscribe$: Subject<any> = new Subject();
  constructor(
    public programsState: V2ProgramsFacade,
    public route: ActivatedRoute,
    private router: Router
  ) {
    route.queryParams
      .pipe(
        takeUntil(this.unsubscribe$),
        map((params) => +params['week']),
        tap((week) => this.programsState.dispatch(selectWeek({ week })))
      )
      .subscribe();
    route.queryParams
      .pipe(
        takeUntil(this.unsubscribe$),
        map((params) => +params['day']),
        tap((day) => this.programsState.dispatch(selectDay({ day })))
      )
      .subscribe();
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
        map((params) => +params['workoutId']),
        tap((id) => this.programsState.dispatch(selectWorkout({ id })))
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.programSelect.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((programId) => this.setParams(programId, 1, 1, null))
      )
      .subscribe();

    this.weekSelect.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        withLatestFrom(this.programsState.selectedV2Programs$),
        tap(([week, program]) => {
          const day = 1;
          const workoutId = program.workouts.find(
            (w) => w.week === +week && w.day === day
          ).id;
          this.daySelect.setValue(day);
          this.setParams(program.id, week, day, workoutId);
        })
      )
      .subscribe();

    this.daySelect.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        withLatestFrom(this.programsState.selectedV2Programs$),
        tap(([day, program]) => {
          const week = this.route.snapshot.queryParams['week'] ?? 1;
          const workoutId = program.workouts.find(
            (w) => w.week === +week && w.day === day
          ).id;

          this.setParams(program.id, week, day, workoutId);
        })
      )
      .subscribe();

    this.programsState.selectedV2Programs$
      .pipe(
        take(1),
        tap((program) => {
          const week = this.route.snapshot.queryParams['week'] ?? 1;
          const day = this.route.snapshot.queryParams['day'] ?? 1;
          const workoutId =
            this.route.snapshot.queryParams['workoutId'] ??
            program.workouts.find((w) => w.week === +week && w.day === +day).id;

          this.programSelect.setValue(program.id, { emitEvent: false });
          this.weekSelect.setValue(+week);
          this.daySelect.setValue(+day);
          this.setParams(program.id, week, day, workoutId);
        })
      )
      .subscribe();
  }

  onSave(/*output: SessionItemCardOutput*/ output) {
    // const { sessionItemStatistic, setStatistics } = output;
    // /**
    //  * if there is an id, update the session item statistic
    //  * else, save a new session item statistic
    //  */
    // if (sessionItemStatistic.id) {
    //   this.sessionsState.dispatch(
    //     SessionItemStatisticsActions.updateSessionItemStatistic({
    //       sessionItemStatistic,
    //     })
    //   );
    // } else {
    //   this.sessionsState.dispatch(
    //     SessionItemStatisticsActions.saveSessionItemStatistic({
    //       sessionItemStatistic,
    //     })
    //   );
    // }
    // setStatistics.forEach((setStatistic) => {
    //   if (setStatistic.id) {
    //     this.sessionsState.dispatch(
    //       SetStatisticsActions.updateSetStatistic({ setStatistic })
    //     );
    //   } else {
    //     this.sessionsState.dispatch(
    //       SetStatisticsActions.saveSetStatistic({ setStatistic })
    //     );
    //   }
    // });
  }

  isWorkoutActive(id): boolean {
    const activeDay = +this.route.snapshot.queryParams['workoutId'];
    return activeDay === id;
  }

  selectWorkout(id: number) {
    this.programsState.dispatch(selectWorkout({ id }));
  }

  setParams(programId: number, week: number, day: number, workoutId: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        programId,
        week,
        day,
        workoutId,
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
