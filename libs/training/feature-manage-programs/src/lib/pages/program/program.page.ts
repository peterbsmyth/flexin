import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BoardCardData,
  loadDescendantsFromProgramPage,
  openWorkoutModal,
  ProgramsFacade,
  selectProgramFromPage,
  selectWeek,
  updateWorkoutAndFutureWorkoutsFromWorkoutPage,
  updateWorkoutFromWorkoutPage,
} from '@bod/training/domain';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { WorkoutDialog } from '../../components/workout-dialog/workout.dialog';

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
  selectedWorkout$: Observable<number> = this.route.queryParams.pipe(
    map((params) => +params['workoutId'])
  );

  constructor(
    public programsState: ProgramsFacade,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    route.queryParams
      .pipe(
        takeUntil(this.unsubscribe$),
        map((params) => +params['programId']),
        filter((id) => Number.isInteger(id)),
        tap((id) => {
          this.programsState.dispatch(selectProgramFromPage({ id }));
          this.programsState.dispatch(
            loadDescendantsFromProgramPage({
              id,
            })
          );
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

    route.queryParams
      .pipe(
        takeUntil(this.unsubscribe$),
        map((params) => +params['workoutId']),
        tap((workoutId) =>
          this.programsState.dispatch(openWorkoutModal({ workoutId }))
        )
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
        withLatestFrom(this.programsState.selectedPrograms$),
        tap(([week, program]) => this.setParams(program.id, week))
      )
      .subscribe();

    this.programsState.workoutFormData$
      .pipe(
        takeUntil(this.unsubscribe$),
        distinctUntilKeyChanged('workout'),
        filter((form) => !!form.workout),
        switchMap((form) => {
          const dialogRef = this.dialog.open(WorkoutDialog, {
            width: '800px',
            data: form,
          });

          return dialogRef.afterClosed();
        }),
        tap((data) => {
          /**
           * reset the query params to close the modal
           */
          this.setWorkoutIdParam(null);
          /**
           * respond with the correct action
           */
          if (data?.save) {
            this.programsState.dispatch(
              updateWorkoutFromWorkoutPage({
                workout: data.save,
              })
            );
          }

          if (data?.savePlus) {
            this.programsState.dispatch(
              updateWorkoutAndFutureWorkoutsFromWorkoutPage({
                workout: data.savePlus,
              })
            );
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.programsState.selectedPrograms$
      .pipe(
        take(1),
        filter((program) => !!program),
        tap((program) => {
          this.programsState.dispatch(
            loadDescendantsFromProgramPage({
              id: program.id,
            })
          );
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

  setParams(programId?: number, week?: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        programId: programId ?? this.route.snapshot.params['programId'],
        week: week ?? this.route.snapshot.params['week'],
      },
      queryParamsHandling: 'merge',
    });
  }

  setWorkoutIdParam(workoutId: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        workoutId,
      },
      queryParamsHandling: 'merge',
    });
  }

  onCardClick(card: BoardCardData) {
    this.setWorkoutIdParam(card.id);
  }
}
