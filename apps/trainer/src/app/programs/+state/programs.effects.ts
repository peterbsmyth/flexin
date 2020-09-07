import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as ProgramsPageActions from './programs.actions';
import { ProgramService } from '@bod/data';
import { map, filter } from 'rxjs/operators';
import { routerNavigationAction } from '@ngrx/router-store';

@Injectable()
export class ProgramsEffects {
  loadPrograms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramsPageActions.loadPrograms),
      fetch({
        run: (action) => {
          return this.programs$.getAll()
            .pipe(
              map(programs => ProgramsPageActions.loadProgramsSuccess({ programs }))
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ProgramsPageActions.loadProgramsFailure({ error });
        },
      })
    )
  );

  loadProgram$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigationAction),
      map(a => a.payload.routerState.root.firstChild.firstChild.params.id),
      filter(id => id), // only fetch if there is an id
      fetch({
        run: (id) => {
          return this.programs$.getOne(id)
            .pipe(
              map(program => ProgramsPageActions.loadProgramSuccess({ program }))
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ProgramsPageActions.loadProgramFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private programs$: ProgramService
  ) {}
}
