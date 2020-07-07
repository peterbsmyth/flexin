import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromPrograms from './programs.reducer';
import * as ProgramsActions from './programs.actions';
import { mockPrograms } from '@bod/models';

@Injectable()
export class ProgramsEffects {
  loadPrograms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramsActions.loadPrograms),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ProgramsActions.loadProgramsSuccess({ programs: mockPrograms });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ProgramsActions.loadProgramsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
