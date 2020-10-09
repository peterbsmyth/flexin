import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {
  SetStatisticsActions,
  SetStatisticsFacade,
  WeekStatisticsActions,
  WeekStatisticsFacade,
} from '@bod/training/domain';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeekStatisticLoadedGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    this.weekStatisticsState.dispatch(
      WeekStatisticsActions.loadDescendants({
        id: next.params['weekStatisticId'],
      })
    );
    return this.weekStatisticWithDescendants();
  }

  weekStatisticWithDescendants(): Observable<boolean> {
    return this.weekStatisticsState.descendantsLoaded$.pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }

  constructor(private weekStatisticsState: WeekStatisticsFacade) {}
}
