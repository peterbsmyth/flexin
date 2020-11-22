import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, switchMap, tap, filter } from 'rxjs/operators';
import { BoardCardData } from '../entities/component.models';
import { uniqBy } from 'lodash-es';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Exercise, Workout } from '@bod/shared/models';
import { WorkoutsDataService } from './workouts.data.service';
import { ProgramsDataService } from './programs.data.service';

@Injectable({
  providedIn: 'root',
})
export class DraftProgramsDataService {
  private _draftProgramBoardSubject = new BehaviorSubject<BoardCardData[][]>([
    [],
    [],
    [],
    [],
  ]);
  public draftProgramBoard$ = this._draftProgramBoardSubject.asObservable();
  private _programConfigurationSubject = new BehaviorSubject<Workout[]>([]);
  public draftProgramConfiguration$ = this._programConfigurationSubject.asObservable();
  private _lastWorkoutLocalId = 0;
  public popDraftDay() {
    const board = [...this._draftProgramBoardSubject.getValue()].slice(0, -1);
    this.storage.set('boardCardData', board).subscribe();
  }
  public pushDraftDay() {
    const board = [...this._draftProgramBoardSubject.getValue(), []];
    this.storage.set('boardCardData', board).subscribe();
  }
  public resetDraft() {
    const board = [[], [], [], []];
    this.storage.set('boardCardData', board).subscribe();
  }

  addIncompleteWorkouts(
    board: BoardCardData[][],
    exercises: Exercise[],
    weekCount: number
  ) {
    this.storage.set('boardCardData', board).subscribe();
    const weeks = [...Array(weekCount)].map((week, i) => ({
      id: i + 1,
      number: i + 1,
    }));
    const workouts: Workout[] = [];
    weeks.forEach((week) => {
      board.forEach((column, i) => {
        column.forEach((card, j) => {
          const workout: Workout = {
            id: ++this._lastWorkoutLocalId,
            week: week.number,
            day: i + 1,
            order: j + 1,
            reps: null,
            amrap: null,
            setCount: null,
            intensityId: null,
            weight: null,
            weightUnit: '',
            exerciseId: card.id,
            exercise: exercises.find((e) => e.id === card.id),
            tempo: null,
            notes: null,
            programId: null,
            setStatistics: [],
          };

          workouts.push(workout);
        });
      });
    });
    const uniqueWorkouts: Workout[] = uniqBy(workouts, 'exerciseId');
    this.storage.set('workouts', uniqueWorkouts).subscribe();
  }

  createProgram(data: Workout[], number: number): Observable<any> {
    const oldWorkouts = this._programConfigurationSubject.getValue();
    const draftWorkouts = oldWorkouts
      /**
       * for all of the workouts, find in the data the updates to the workout by matching
       * the exerciseId. Update the old workout with the new data and use the old workout id
       */
      .map((oldWorkout) => ({
        ...data.find((workout) => workout.exerciseId === oldWorkout.exerciseId),
        id: oldWorkout.id,
        day: oldWorkout.day, // previous sessionId: oldworkout.sessionId
        order: oldWorkout.order,
      }));

    return this.programService.saveOne({ number }).pipe(
      switchMap((program) => {
        /**
         * post the workouts without the temporary id and replacing
         * the temporary programId with the real programId
         */
        return forkJoin(
          draftWorkouts.map((workout) =>
            this.workoutService.saveOne({
              ...workout,
              id: undefined,
              programId: program.id,
            })
          )
        );
      }),
      switchMap(() => this.storage.clear()),
      catchError(() => {
        this.snackbar.open(
          'could not create program. fix errors and try again.',
          '',
          { duration: 5000 }
        );
        return of();
      })
    );
  }

  constructor(
    private programService: ProgramsDataService,
    private workoutService: WorkoutsDataService,
    private storage: StorageMap,
    private snackbar: MatSnackBar
  ) {
    this.storage
      .watch('workouts')
      .pipe(
        tap((data: Workout[]) => {
          this._programConfigurationSubject.next(data);
        })
      )
      .subscribe();

    this.storage
      .watch('boardCardData')
      .pipe(
        filter((board) => !!board),
        tap((board: BoardCardData[][]) => {
          this._draftProgramBoardSubject.next(board);
        })
      )
      .subscribe();
  }
}
