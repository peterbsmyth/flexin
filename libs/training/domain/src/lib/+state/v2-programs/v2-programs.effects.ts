import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromV2Programs from './v2-programs.reducer';
import * as V2ProgramsActions from './v2-programs.actions';

@Injectable()
export class V2ProgramsEffects {
  loadV2Programs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(V2ProgramsActions.loadV2Programs),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return V2ProgramsActions.loadV2ProgramsSuccess({ v2Programs: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return V2ProgramsActions.loadV2ProgramsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
