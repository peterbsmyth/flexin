import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromV2Programs from './v2-programs.reducer';
import * as V2ProgramsActions from './v2-programs.actions';
import * as V2ExercisesActions from '../v2-exercises/v2-exercises.actions';
import { ProgramV2sDataService } from '../../infrastructure/v2-programs.data.service';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { mockExercise, mockPrograms } from '@bod/shared/models';
import { forkJoin } from 'rxjs';
import { ExerciseV2sDataService } from '../../infrastructure/v2-exercises.data.service';
import { uniqBy } from 'lodash-es';

@Injectable()
export class V2ProgramsEffects {
  loadV2Programs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(V2ProgramsActions.loadV2Programs),
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
          v2Exercises: [mockExercise],
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

  constructor(
    private actions$: Actions,
    private backend: ProgramV2sDataService,
    private exercisesService: ExerciseV2sDataService
  ) {}
}
