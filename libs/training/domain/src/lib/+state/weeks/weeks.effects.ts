import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import { WeeksPageActions } from './actions';
import { WeekDataService } from '../../infrastructure/week.data.service';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { ProgramsActions } from '../programs/actions';
import { Store } from '@ngrx/store';
import { PartialState } from '../root.reducer';
import { ProgramDataService } from '../../infrastructure/program.data.service';

@Injectable()
export class WeeksEffects {
  loadSessionsByWeekPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeeksPageActions.loadWeeksByProgram),
      fetch({
        run: ({ id }) => {
          return this.weekService
            .getAllByProgram(id)
            .pipe(
              map((weeks) =>
                WeeksPageActions.loadWeeksByProgramSuccess({ weeks })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return WeeksPageActions.loadWeeksByProgramFailure({ error });
        },
      })
    )
  );

  loadWeekPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeeksPageActions.loadWeek),
      fetch({
        run: ({ id }) => {
          return this.weekService
            .getOne(id)
            .pipe(map((week) => WeeksPageActions.loadWeekSuccess({ week })));
        },
        onError: (action, error) => {
          console.error('Error', error);
          return WeeksPageActions.loadWeekFailure({ error });
        },
      })
    )
  );

  loadWeekWithAscendants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeeksPageActions.loadWeekWithAscendants),
      fetch({
        run: ({ id }) => {
          return this.weekService.getOne(id).pipe(
            switchMap((week) => {
              this.store.dispatch(WeeksPageActions.loadWeekSync({ week }));
              return this.programService.getOne(week.programId);
            }),
            mergeMap((program) => [
              ProgramsActions.loadProgramSuccess({ program }),
              WeeksPageActions.loadWeekWithAscendantsSuccess(),
            ])
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return WeeksPageActions.loadWeekFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<PartialState>,
    private weekService: WeekDataService,
    private programService: ProgramDataService
  ) {}
}
