import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {
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
      WeekStatisticsActions.loadRelations({
        id: next.params['weekStatisticId'],
      })
    );
    return this.weekStatisticWithRelations();
  }

  weekStatisticWithRelations(): Observable<boolean> {
    return this.weekStatisticsState.relationsLoaded$.pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }

  constructor(private weekStatisticsState: WeekStatisticsFacade) {}
}
