import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromPrograms from './programs.reducer';
import * as ProgramsActions from './programs.actions';
import { ProgramService } from '@bod/data';
import { map } from 'rxjs/operators';

@Injectable()
export class ProgramsEffects {
  loadPrograms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramsActions.loadPrograms),
      fetch({
        run: (action) => {
          return this.programs$.getAll()
            .pipe(
              map(programs => ProgramsActions.loadProgramsSuccess({ programs }))
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ProgramsActions.loadProgramsFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private programs$: ProgramService
  ) {}
}
