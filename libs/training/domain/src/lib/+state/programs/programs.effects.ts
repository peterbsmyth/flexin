import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { uniqBy } from 'lodash-es';
import { forkJoin } from 'rxjs';
import { map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { DraftProgramsDataService } from '../../infrastructure/draft-programs.data.service';
import { ExercisesDataService } from '../../infrastructure/exercises.data.service';
import { ProgramsDataService } from '../../infrastructure/programs.data.service';
import * as ExercisesActions from '../exercises/exercises.actions';
import { getAllExercises } from '../exercises/exercises.selectors';
import { TrainingState } from '../state';
import * as ProgramsActions from './programs.actions';

@Injectable()
export class ProgramsEffects {
  loadPrograms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProgramsActions.loadPrograms,
        ProgramsActions.loadProgramsFromPage
      ),
      fetch({
        run: (action) => {
          return this.backend
            .getAll()
            .pipe(
              map((programs) =>
                ProgramsActions.loadProgramsSuccess({ programs })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ProgramsActions.loadProgramsFailure({ error });
        },
      })
    )
  );

  loadProgram$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramsActions.loadProgramFromGuard),
      fetch({
        // provides an action
        run: ({ id }) => {
          return this.backend
            .getOne(id)
            .pipe(
              map((program) => ProgramsActions.loadProgramSuccess({ program }))
            );
        },
        onError: (action, error: any) => {
          // dispatch an undo action to undo the changes in the client state
          return null;
        },
      })
    )
  );

  loadDescendants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramsActions.loadDescendantsFromProgramPage),
      fetch({
        // provides an action
        run: ({ id }) => {
          return this.backend.getOne(id).pipe(
            switchMap((program) => {
              const uniqueExerciseIds: number[] = uniqBy(
                program.workouts,
                'exerciseId'
              ).map((workout) => workout.exerciseId);
              return forkJoin(
                uniqueExerciseIds.map((exerciseId) =>
                  this.exercisesService.getOne(exerciseId)
                )
              );
            }),
            mergeMap((exercises) => {
              return [
                ExercisesActions.loadExercisesSuccess({
                  exercises: exercises,
                }),
                ProgramsActions.loadDescendantsSuccess(),
              ];
            })
          );
        },
        onError: (action, error: any) => {
          // dispatch an undo action to undo the changes in the client state
          return null;
        },
      })
    )
  );

  addIncompleteSessionItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramsActions.addIncompleteWorkouts),
        withLatestFrom(this.store.select(getAllExercises)),
        tap(([{ board, weekCount }, exercises]) => {
          this.draftProgramService.addIncompleteWorkouts(
            board,
            exercises,
            weekCount
          );
        })
      ),
    { dispatch: false }
  );

  createProgram$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramsActions.createProgram),
        fetch({
          // provides an action
          run: ({ data, number }) => {
            return this.draftProgramService
              .createProgram(data, number)
              .pipe(tap(() => this.router.navigateByUrl('/programs')));
          },
          onError: (action, error: any) => {
            // dispatch an undo action to undo the changes in the client state
            return null;
          },
        })
      ),
    { dispatch: false }
  );

  popDraft$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramsActions.popDraft),
        tap(() => this.draftProgramService.popDraftDay())
      ),
    { dispatch: false }
  );

  pushDraft$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramsActions.pushDraft),
        tap(() => this.draftProgramService.pushDraftDay())
      ),
    { dispatch: false }
  );
  resetDraft$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramsActions.resetDraft),
        tap(() => this.draftProgramService.resetDraft())
      ),
    { dispatch: false }
  );

  constructor(
    private store: Store<TrainingState>,
    private actions$: Actions,
    private backend: ProgramsDataService,
    private draftProgramService: DraftProgramsDataService,
    private router: Router,
    private exercisesService: ExercisesDataService
  ) {}
}
