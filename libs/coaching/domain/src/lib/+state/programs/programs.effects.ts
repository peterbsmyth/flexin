import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { ProgramsPageActions } from './actions';
import { ProgramDataService } from '../../infrastructure/program.data.service';
import { map, tap } from 'rxjs/operators';
import { DraftProgramsDataService } from '../../infrastructure/draft-programs.data.service';
import { Router } from '@angular/router';

@Injectable()
export class ProgramsEffects {
  loadPrograms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramsPageActions.loadPrograms),
      fetch({
        // provides an action
        run: () => {
          return this.programService
            .getAll()
            .pipe(
              map((programs) =>
                ProgramsPageActions.loadProgramsSuccess({ programs })
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
      ofType(ProgramsPageActions.loadProgram),
      fetch({
        // provides an action
        run: ({ id }) => {
          return this.programService
            .getOne(id)
            .pipe(
              map((program) =>
                ProgramsPageActions.loadProgramSuccess({ program })
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

  addIncompleteSessionItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramsPageActions.addIncompleteSessionItems),
        tap(({ lists }) => {
          this.draftProgramService.addIncompleteSessionItems(lists);
        })
      ),
    { dispatch: false }
  );

  everythingExceptCreateProgram$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramsPageActions.everythingExceptCreateProgram),
        tap(({ data }) => {
          return this.draftProgramService.everythingExceptCreateProgram(data);
        })
      ),
    { dispatch: false }
  );

  createProgram$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramsPageActions.createProgram),
        fetch({
          // provides an action
          run: ({ name }) => {
            return this.draftProgramService
              .createProgram(name)
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

  constructor(
    private actions$: Actions,
    private programService: ProgramDataService,
    private draftProgramService: DraftProgramsDataService,
    private router: Router
  ) {}
}
