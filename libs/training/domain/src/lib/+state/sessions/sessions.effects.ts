import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { PartialState } from '../root.reducer';
import { Store } from '@ngrx/store';
import { SessionsActions } from './actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { SessionDataService } from '../../infrastructure/session.data.service';
import { WeekDataService } from '../../infrastructure/week.data.service';
import { ProgramDataService } from '../../infrastructure/program.data.service';
import { WeeksPageActions } from '../weeks/actions';
import { ProgramsActions } from '../programs/actions';

@Injectable()
export class SessionsEffects {
  loadSessionsByWeekPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsActions.loadSessionsByWeek),
      fetch({
        run: ({ id }) => {
          return this.sessionService
            .getAllByWeek(id)
            .pipe(
              map((sessions) =>
                SessionsActions.loadSessionsByWeekSuccess({ sessions })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionsActions.loadSessionsByWeekFailure({ error });
        },
      })
    )
  );

  loadSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsActions.loadSession),
      fetch({
        run: ({ id }) => {
          return this.sessionService
            .getOne(id)
            .pipe(
              map((session) => SessionsActions.loadSessionSuccess({ session }))
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionsActions.loadSessionFailure({ error });
        },
      })
    )
  );

  loadSessionWithAscendants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionsActions.loadSessionWithAscendants),
      fetch({
        run: ({ id }) => {
          return this.sessionService.getOne(id).pipe(
            switchMap((session) => {
              this.store.dispatch(SessionsActions.loadSessionSync({ session }));
              return this.weekService.getOne(session.weekId);
            }),
            switchMap((week) => {
              this.store.dispatch(WeeksPageActions.loadWeekSuccess({ week }));
              return this.programService.getOne(week.programId);
            }),
            mergeMap((program) => {
              return [
                ProgramsActions.loadProgramSuccess({ program }),
                SessionsActions.loadSessionWithAscendantsSuccess(),
              ];
            })
          );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionsActions.loadSessionWithAscendantsFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<PartialState>,
    private sessionService: SessionDataService,
    private weekService: WeekDataService,
    private programService: ProgramDataService
  ) {}
}
