import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from '@bod/shared/models';
import {
  BoardCardData,
  loadDescendantsFromProgramPage,
  loadExercises,
  openWorkoutModal,
  ProgramsFacade,
  selectProgramFromPage,
  selectWeek,
  updateWorkoutAndFutureWorkoutsFromWorkoutPage,
  updateWorkoutFromWorkoutPage,
} from '@bod/training/domain';
import { EventEmitter } from 'events';
import { Observable, Subject } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  map,
  switchAll,
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
  private afterClosedObservableSubject: Subject<
    Observable<any>
  > = new Subject();
  afterClosed$: Observable<
    any
  > = this.afterClosedObservableSubject.asObservable().pipe(switchAll());
  private saveExerciseObservableSubject: Subject<
    EventEmitter<Workout>
  > = new Subject();
  saveExercise$: Observable<
    Workout
  > = this.saveExerciseObservableSubject.asObservable().pipe(switchAll());
  programSelect = new FormControl(null);
  weekSelect = new FormControl(null);
  unsubscribe$: Subject<unknown> = new Subject();
  selectedWeek$: Observable<number> = this.route.queryParams.pipe(
    map((params) => +params['week'])
  );
  selectedWorkout$: Observable<number> = this.route.queryParams.pipe(
    takeUntil(this.unsubscribe$),
    map((params) => (params['workoutId'] ? +params['workoutId'] : null))
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

    this.selectedWorkout$
      .pipe(
        tap((workoutId) => {
          this.programsState.dispatch(openWorkoutModal({ workoutId }));
        })
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
        distinctUntilKeyChanged('dataReady'),
        filter((form) => form.dataReady),
        tap((form) => {
          const dialogRef = this.dialog.open(WorkoutDialog, {
            width: '800px',
            data: form,
          });

          this.saveExerciseObservableSubject.next(
            dialogRef.componentInstance.saveExercise
          );
          this.afterClosedObservableSubject.next(dialogRef.afterClosed());
        })
      )
      .subscribe();

    this.afterClosed$
      .pipe(
        takeUntil(this.unsubscribe$),
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

    this.saveExercise$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((workout) => {
          this.programsState.dispatch(
            updateWorkoutFromWorkoutPage({
              workout,
            })
          );
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.programsState.dispatch(loadExercises());
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
