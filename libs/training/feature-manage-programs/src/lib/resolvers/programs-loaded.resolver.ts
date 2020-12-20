import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { loadProgramsFromPage, ProgramsFacade } from '@bod/training/domain';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProgramsLoadedResolver implements Resolve<boolean> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.programsState.dispatch(loadProgramsFromPage());
    return this.waitForCollectionToLoad();
  }

  waitForCollectionToLoad(): Observable<boolean> {
    return this.programsState.loaded$.pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }
  constructor(private programsState: ProgramsFacade, private router: Router) {}
}
