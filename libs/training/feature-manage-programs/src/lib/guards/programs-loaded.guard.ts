import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import {
  loadProgramsFromPage,
  ProgramsFacade,
  selectProgramFromGuard,
} from '@bod/training/domain';
import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMapTo,
  take,
  tap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProgramsLoadedGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    this.programsState.dispatch(loadProgramsFromPage());
    return this.waitForCollectionToLoad().pipe(
      switchMapTo(this.programsState.allPrograms$),
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

  constructor(private programsState: ProgramsFacade, private router: Router) {}
}
