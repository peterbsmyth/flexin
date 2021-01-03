import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Exercise, SetStatistic, Workout } from '@bod/shared/models';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, EMPTY, forkJoin } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { BoardCardData } from '../entities/component.models';
import { ProgramsDataService } from './programs.data.service';
import { SetStatisticsDataService } from './set-statistics.data.service';
import { WorkoutsDataService } from './workouts.data.service';

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
  private allWorkoutsSubject = new BehaviorSubject<Workout[]>([]);
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
    const weeks = new Array(weekCount).fill(null).map((week, i) => ({
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
            amrap: false,
            setCount: null,
            intensityId: null,
            weight: 0,
            weightUnit: 'lbs',
            exerciseId: card.id,
            exercise: exercises.find((e) => e.id === card.id),
            tempo: null,
            notes: ' ',
            programId: null,
            setStatistics: [],
          };

          workouts.push(workout);
        });
      });
    });
    /**
     * use only the week one workouts because the workout configuration grid
     * is predicated on each week being the same
     */

    this.storage.set('workouts', workouts).subscribe();
  }

  createProgram(data: Workout[], number: number) {
    const oldWorkouts = this.allWorkoutsSubject.getValue();
    const draftWorkouts = oldWorkouts
      /**
       * for all of the workouts, find in the data the updates to the workout by matching
       * the exerciseId. Update the old workout with the new data and use the old workout id
       */
      .map((oldWorkout) => ({
        ...data.find((workout) => workout.exerciseId === oldWorkout.exerciseId),
        id: oldWorkout.id,
        day: oldWorkout.day, // previous day: oldworkout.day
        order: oldWorkout.order,
        week: oldWorkout.week,
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
              exercise: undefined,
              setStatistics: undefined,
              programId: program.id,
            })
          )
        );
      }),
      switchMap((workouts) => {
        const setStatistics: SetStatistic[] = workouts
          .map((workout) =>
            new Array(workout.setCount).fill(null).map((stat, i) => ({
              id: undefined,
              workoutId: workout.id,
              programId: workout.programId,
              weight: workout.weight ? 0 : undefined,
              reps: 0,
              set: i + 1,
            }))
          )
          .flat();
        return forkJoin([
          ...setStatistics.map((stat) => this.setStaisticService.postOne(stat)),
        ]);
      }),
      switchMap(() => this.storage.clear()),
      catchError(() => {
        this.snackbar.open(
          'could not create program. fix errors and try again.',
          '',
          { duration: 5000 }
        );
        return EMPTY;
      })
    );
  }

  constructor(
    private programService: ProgramsDataService,
    private workoutService: WorkoutsDataService,
    private setStaisticService: SetStatisticsDataService,
    private storage: StorageMap,
    private snackbar: MatSnackBar
  ) {
    this.storage
      .watch('workouts')
      .pipe(
        tap((data: Workout[]) => {
          const weekOneWorkouts = data?.filter((w) => w.week === 1);
          this._programConfigurationSubject.next(weekOneWorkouts);
          this.allWorkoutsSubject.next(data);
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
