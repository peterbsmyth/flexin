import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  SessionItemsFacade,
  SessionItemsActions,
} from '@bod/coaching/domain';
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
export class SessionItemExistsGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasSessionItem(next.params['sessionItemId']);
  }

  hasSessionItemInStore(): Observable<boolean> {
    return this.sessionItemsState.selectedSessionItems$.pipe(
      map((sessionItem) => !!sessionItem)
    );
  }

  hasSessionItem(id: string): Observable<boolean> {
    /**
     * if there is a result from selected sessionItem, cool
     */
    this.sessionItemsState.dispatch(
      SessionItemsActions.selectSessionItem({ id: +id })
    );
    return this.hasSessionItemInStore().pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        } else {
          this.sessionItemsState.dispatch(
            SessionItemsActions.loadSessionItemWithExercise({ id: +id })
          );
          return this.waitForCollectionToLoad().pipe(
            switchMapTo(this.sessionItemsState.selectedSessionItems$),
            map((sessionItem) => !!sessionItem),
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
    return this.sessionItemsState.loaded$.pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }

  constructor(
    private sessionItemsState: SessionItemsFacade,
    private router: Router
  ) {}
}
