import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { navigation } from '@nrwl/angular';

import * as fromPrograms from './programs.reducer';
import * as ProgramsActions from './programs.actions';
import { mockProgram } from '@bod/models';
import { ProgramPage } from '../pages/program/program.page';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProgramsPage } from '../pages/programs/programs.page';
import { ProgramService } from '@bod/data';
import { map } from 'rxjs/operators';

@Injectable()
export class ProgramsEffects {
  loadPrograms$ =createEffect(() =>
    this.actions$.pipe(
      // listens for the routerNavigation action from @ngrx/router-store
      navigation(ProgramsPage, {
        run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
          return this.programService.getAll()
            .pipe(
              map((programs) => ProgramsActions.loadProgramsSuccess({ programs }))
            );
        },
        onError: (
          activatedRouteSnapshot: ActivatedRouteSnapshot,
          error: any
        ) => {
          // we can log and error here and return null
          // we can also navigate back
          return null;
        },
      })
    )
  );

  loadProgram$ = createEffect(() =>
    this.actions$.pipe(
      // listens for the routerNavigation action from @ngrx/router-store
      navigation(ProgramPage, {
        run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
          return this.programService.getOne(activatedRouteSnapshot.params['programId'])
            .pipe(
              map((program) => ProgramsActions.loadProgramSuccess({ program }))
            );
        },
        onError: (
          activatedRouteSnapshot: ActivatedRouteSnapshot,
          error: any
        ) => {
          // we can log and error here and return null
          // we can also navigate back
          return null;
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private programService: ProgramService
  ) {}
}
