import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SessionStatisticDataService } from '../../infrastructure/session-statistic.data.service';
import { PartialState } from '../root.reducer';
import { getAllWeekStatistics } from '../week-statistics/week-statistics.selectors';
import { SessionStatisticsActions } from './actions';

@Injectable()
export class SessionStatisticsEffects {
  loadSessionStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionStatisticsActions.loadSessionStatistics),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return SessionStatisticsActions.loadSessionStatisticsSuccess({
            sessionStatistics: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SessionStatisticsActions.loadSessionStatisticsFailure({
            error,
          });
        },
      })
    )
  );

  loadSessionStatisticBySession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionStatisticsActions.loadSessionStatisticBySession),
      fetch({
        run: (action) => {
          return this.backend.getOneBySession(action.session.id).pipe(
            map((sessionStatistic) =>
              SessionStatisticsActions.loadSessionStatisticBySessionSuccess({
                sessionStatistic,
              })
            )
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          if (error.error.error.statusCode === 404) {
            return SessionStatisticsActions.saveSessionStatisticBySession(
              action
            );
          } else {
            return SessionStatisticsActions.loadSessionStatisticBySessionFailure(
              {
                error,
              }
            );
          }
        },
      })
    )
  );

  saveSessionStatisticBySession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionStatisticsActions.saveSessionStatisticBySession),
      withLatestFrom(this.store.select(getAllWeekStatistics)),
      switchMap(([action, weekStatistics]) => {
        const weekStatisticId = weekStatistics.find(
          (weekStatistic) => weekStatistic.weekId === action.session.weekId
        ).id;
        const draftSessionStatistic = {
          sessionId: action.session.id,
          weekStatisticId,
        };
        return this.backend.postOneBySession(draftSessionStatistic).pipe(
          map((sessionStatistic) =>
            SessionStatisticsActions.saveSessionStatisticBySessionSuccess({
              sessionStatistic,
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(
              SessionStatisticsActions.saveSessionStatisticBySessionFailure({
                error,
              })
            );
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<PartialState>,
    private backend: SessionStatisticDataService
  ) {}
}
