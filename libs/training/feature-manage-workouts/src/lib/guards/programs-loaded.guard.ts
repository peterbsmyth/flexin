import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { V2ProgramsFacade } from '@bod/training/domain';
import {
  filter,
  take,
  switchMapTo,
  map,
  catchError,
  tap,
} from 'rxjs/operators';
import {
  selectProgramFromGuard,
  loadProgramsFromPage,
} from '@bod/training/domain';

@Injectable({
  providedIn: 'root',
})
export class ProgramsLoadedGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    this.programsState.dispatch(loadProgramsFromPage());
    return this.waitForCollectionToLoad().pipe(
      switchMapTo(this.programsState.allV2Programs$),
      tap((programs) => {
        const id = next.queryParams['programId'] ?? programs[0].id;
        this.programsState.dispatch(selectProgramFromGuard({ id }));
      }),
      map((programs) => !!programs.length),
      catchError((err) => {
        console.log(err);
        this.router.navigate(['/404']);
        return of(false);
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
