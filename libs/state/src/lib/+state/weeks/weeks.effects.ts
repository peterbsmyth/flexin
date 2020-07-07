import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromWeeks from './weeks.reducer';
import * as WeeksActions from './weeks.actions';
import { mockWeek } from '@bod/models';

@Injectable()
export class WeeksEffects {
  loadWeeks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeeksActions.loadWeeks),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return WeeksActions.loadWeeksSuccess({ weeks: [mockWeek] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return WeeksActions.loadWeeksFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
