import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SessionsFacade, SessionsPageActions } from '@bod/training/domain';
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
export class SessionExistsGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> {
    return this.hasSession(next.params['sessionId']);
  }

  hasSessionInStore(): Observable<boolean> {
    return this.sessionsState.selectedSessions$.pipe(map((session) => !!session));
  }

  hasSession(id: string): Observable<boolean> {
    /**
     * if there is a result from selected session, cool
     */
    this.sessionsState.dispatch(SessionsPageActions.selectSession({ id: +id }));
    return this.hasSessionInStore().pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        } else {
          /**
           * if not a result then dispatch another action to get it on store
           */
          this.sessionsState.dispatch(SessionsPageActions.loadSession({ id: +id }));
          return this.waitForCollectionToLoad().pipe(
            switchMapTo(this.sessionsState.selectedSessions$),
            map((session) => !!session),
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
    return this.sessionsState.loaded$.pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }

  constructor(private sessionsState: SessionsFacade, private router: Router) {}
}
