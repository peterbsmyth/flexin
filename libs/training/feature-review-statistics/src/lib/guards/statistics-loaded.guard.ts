import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {
  SetStatisticsActions,
  SetStatisticsFacade,
} from '@bod/training/domain';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StatisticsLoadedGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    this.setStatisticsState.dispatch(
      SetStatisticsActions.loadSetStatisticsWithAscendants()
    );
    return this.setStatisticsWithAscendantsLoaded();
  }

  setStatisticsWithAscendantsLoaded(): Observable<boolean> {
    return this.setStatisticsState.ascendantsLoaded$.pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }

  constructor(
    private setStatisticsState: SetStatisticsFacade
  ) {}
}
