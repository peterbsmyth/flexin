import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { WeeksFacade, WeeksPageActions } from '@bod/training/domain';
import {
  filter,
  take,
  switchMap,
  switchMapTo,
  map,
  catchError,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeekExistsGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasWeek(next.params['weekId']);
  }

  hasWeekInStore(): Observable<boolean> {
    return this.weeksState.selectedWeeks$.pipe(
      map((week) => !!week?.weekStatistic)
    );
  }

  hasWeek(id: string): Observable<boolean> {
    this.weeksState.dispatch(WeeksPageActions.selectWeek({ id: +id }));
    return this.hasWeekInStore().pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        } else {
          /**
           * if there is a result from selected week, cool
           */
          this.weeksState.dispatch(
            WeeksPageActions.loadWeekWithAscendants({ id: +id })
          );
          return this.waitForCollectionToLoad().pipe(
            switchMapTo(this.weeksState.selectedWeeks$),
            map((week) => !!week),
            catchError(() => {
              this.router.navigate(['/404']);
              return of(false);
            })
          );
        }
      })
    );
  }

  waitForCollectionToLoad(): Observable<boolean> {
    return this.weeksState.loaded$.pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }

  constructor(private weeksState: WeeksFacade, private router: Router) {}
}
