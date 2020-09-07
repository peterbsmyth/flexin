import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromPrograms from './programs.reducer';
import * as ProgramsActions from './programs.actions';
import { ProgramDataService } from '../../infrastructure/program.data.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ProgramsEffects {
  loadPrograms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramsActions.loadPrograms),
      fetch({
        // provides an action
        run: () => {
          return this.programService
            .getAll()
            .pipe(
              map((programs) =>
                ProgramsActions.loadProgramsSuccess({ programs })
              )
            );
        },
        onError: (action, error: any) => {
          // dispatch an undo action to undo the changes in the client state
          return null;
        },
      })
    )
  );

  loadProgram$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramsActions.loadProgram),
      fetch({
        // provides an action
        run: ({ id }) => {
          return this.programService
            .getOne(id)
            .pipe(
              map((program) =>
                ProgramsActions.loadProgramSuccess({ program })
              )
            );
        },
        onError: (action, error: any) => {
          // dispatch an undo action to undo the changes in the client state
          return null;
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private programService: ProgramDataService
  ) {}
}
