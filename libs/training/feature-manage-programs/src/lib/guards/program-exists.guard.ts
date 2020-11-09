import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProgramsActions, V2ProgramsFacade } from '@bod/training/domain';

import {
  filter,
  take,
  switchMap,
  switchMapTo,
  map,
  catchError,
} from 'rxjs/operators';
import {
  selectProgramFromGuard,
  loadProgramFromGuard,
} from '@bod/training/domain';

@Injectable({
  providedIn: 'root',
})
export class ProgramExistsGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasProgram(next.params['programId']);
  }

  hasProgramInStore(): Observable<boolean> {
    return this.programsState.selectedV2Programs$.pipe(
      map((program) => !!program)
    );
  }

  hasProgram(id: string): Observable<boolean> {
    /**
     * if there is a result from selected program, cool
     */
    this.programsState.dispatch(selectProgramFromGuard({ id: +id }));
    return this.hasProgramInStore().pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        } else {
          this.programsState.dispatch(loadProgramFromGuard({ id: +id }));
          return this.waitForCollectionToLoad().pipe(
            switchMapTo(this.programsState.selectedV2Programs$),
            map((program) => !!program),
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
    return this.programsState.loaded$.pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }

  constructor(
    private programsState: V2ProgramsFacade,
    private router: Router
  ) {}
}
