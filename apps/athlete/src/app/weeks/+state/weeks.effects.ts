import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, navigation } from '@nrwl/angular';

import * as fromWeeks from './weeks.reducer';
import * as WeeksActions from './weeks.actions';
import { WeekPage } from '../pages/week/week.page';
import { ActivatedRouteSnapshot } from '@angular/router';
import { WeekService } from '@bod/data';
import { map } from 'rxjs/operators';

@Injectable()
export class WeeksEffects {
  loadWeeks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeeksActions.loadWeeks),
      fetch({
        run: () => {
          return this.weekService
            .getAll()
            .pipe(map((weeks) => WeeksActions.loadWeeksSuccess({ weeks })));
        },
        onError: (action, error) => {
          console.error('Error', error);
          return WeeksActions.loadWeeksFailure({ error });
        },
      })
    )
  );

  loadWeek$ = createEffect(() =>
    this.actions$.pipe(
      // listens for the routerNavigation action from @ngrx/router-store
      navigation(WeekPage, {
        run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
          return this.weekService
            .getOne(activatedRouteSnapshot.params['weekId'])
            .pipe(map((week) => WeeksActions.loadWeekSuccess({ week })));
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

  constructor(private actions$: Actions, private weekService: WeekService) {}
}
