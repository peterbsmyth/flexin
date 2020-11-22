import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Program } from '@bod/shared/models';
import {
  ProgramsFacade,
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
  selector: 'components-filters',
  templateUrl: './filters.container.html',
  styleUrls: ['./filters.container.scss'],
})
export class FiltersContainer implements OnInit, OnDestroy {
  programSelect = new FormControl(null);
  weekSelect = new FormControl(null);
  daySelect = new FormControl(null);
  unsubscribe$: Subject<any> = new Subject();
  constructor(
    public programsState: ProgramsFacade,
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
        tap((programId) => {
          this.weekSelect.setValue(1);
          this.setParams(programId, 1, 1, null);
        })
      )
      .subscribe();

    this.weekSelect.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        withLatestFrom(this.programsState.selectedPrograms$),
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
        withLatestFrom(this.programsState.selectedPrograms$),
        tap(([day, program]) => {
          const week = this.route.snapshot.queryParams['week'] ?? 1;
          const workoutId = program.workouts.find(
            (w) => w.week === +week && w.day === day
          ).id;

          this.setParams(program.id, week, day, workoutId);
        })
      )
      .subscribe();

    this.programsState.selectedPrograms$
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
