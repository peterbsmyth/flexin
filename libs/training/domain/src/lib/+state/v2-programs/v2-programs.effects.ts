import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromV2Programs from './v2-programs.reducer';
import * as V2ProgramsActions from './v2-programs.actions';
import * as V2ExercisesActions from '../v2-exercises/v2-exercises.actions';
import { ProgramV2sDataService } from '../../infrastructure/v2-programs.data.service';
import { map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { mockExercises, mockPrograms } from '@bod/shared/models';
import { forkJoin } from 'rxjs';
import { ExerciseV2sDataService } from '../../infrastructure/v2-exercises.data.service';
import { uniqBy } from 'lodash-es';
import { State } from '../state';
import { Store } from '@ngrx/store';
import { V2DraftProgramsDataService } from '../../infrastructure/v2-draft-programs.data.service';
import { Router } from '@angular/router';
import { getAllV2Exercises } from '../v2-exercises/v2-exercises.selectors';

@Injectable()
export class V2ProgramsEffects {
  loadV2Programs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        V2ProgramsActions.loadV2Programs,
        V2ProgramsActions.loadProgramsFromPage
      ),
      fetch({
        run: (action) => {
          return V2ProgramsActions.loadV2ProgramsSuccess({
            v2Programs: mockPrograms,
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return V2ProgramsActions.loadV2ProgramsFailure({ error });
        },
      })
    )
  );

  loadProgram$ = createEffect(() =>
    this.actions$.pipe(
      ofType(V2ProgramsActions.loadProgramFromGuard),
      map(() =>
        V2ProgramsActions.loadProgramSuccess({ program: mockPrograms[0] })
      )
      // fetch({
      //   // provides an action
      //   run: ({ id }) => {
      //     return this.backend
      //       .getOne(id)
      //       .pipe(
      //         map((program) =>
      //           V2ProgramsActions.loadProgramSuccess({ program })
      //         )
      //       );
      //   },
      //   onError: (action, error: any) => {
      //     // dispatch an undo action to undo the changes in the client state
      //     return null;
      //   },
      // })
    )
  );

  loadDescendants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(V2ProgramsActions.loadDescendantsFromProgramPage),
      map(() =>
        V2ExercisesActions.loadV2ExercisesSuccess({
          v2Exercises: mockExercises,
        })
      )
      // fetch({
      //   // provides an action
      //   run: ({ id }) => {
      //     return this.backend.getOne(id).pipe(
      //       switchMap((program) => {
      //         const uniqueExerciseIds: number[] = uniqBy(
      //           program.workouts,
      //           'exerciseId'
      //         ).map((workout) => workout.exerciseId);
      //         return forkJoin(
      //           uniqueExerciseIds.map((exerciseId) =>
      //             this.exercisesService.getOne(exerciseId)
      //           )
      //         );
      //       }),
      //       mergeMap((exercises) => {
      //         return [
      //           V2ExercisesActions.loadV2ExercisesSuccess({
      //             v2Exercises: exercises,
      //           }),
      //           V2ProgramsActions.loadDescendantsSuccess(),
      //         ];
      //       })
      //     );
      //   },
      //   onError: (action, error: any) => {
      //     // dispatch an undo action to undo the changes in the client state
      //     return null;
      //   },
      // })
    )
  );

  addIncompleteSessionItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(V2ProgramsActions.addIncompleteWorkouts),
        withLatestFrom(this.store.select(getAllV2Exercises)),
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
        ofType(V2ProgramsActions.createProgram),
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
        ofType(V2ProgramsActions.popDraft),
        tap(() => this.draftProgramService.popDraftDay())
      ),
    { dispatch: false }
  );

  pushDraft$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(V2ProgramsActions.pushDraft),
        tap(() => this.draftProgramService.pushDraftDay())
      ),
    { dispatch: false }
  );
  resetDraft$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(V2ProgramsActions.resetDraft),
        tap(() => this.draftProgramService.resetDraft())
      ),
    { dispatch: false }
  );

  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private backend: ProgramV2sDataService,
    private draftProgramService: V2DraftProgramsDataService,
    private router: Router,
    private exercisesService: ExerciseV2sDataService
  ) {}
}
