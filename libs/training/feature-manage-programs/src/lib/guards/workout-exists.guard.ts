import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  loadWorkoutFromGuard,
  selectWorkoutFromGuard,
  WorkoutsFacade,
} from '@bod/training/domain';
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
export class WorkoutExistsGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasWorkout(next.params['workoutId']);
  }

  hasWorkoutInStore(): Observable<boolean> {
    return this.workoutsState.selectedWorkouts$.pipe(
      map((workout) => !!workout)
    );
  }

  hasWorkout(id: string): Observable<boolean> {
    /**
     * if there is a result from selected workout, cool
     */
    this.workoutsState.dispatch(selectWorkoutFromGuard({ id: +id }));
    return this.hasWorkoutInStore().pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        } else {
          this.workoutsState.dispatch(loadWorkoutFromGuard({ id: +id }));
          return this.waitForCollectionToLoad().pipe(
            switchMapTo(this.workoutsState.selectedWorkouts$),
            map((workout) => !!workout),
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
    return this.workoutsState.loaded$.pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }

  constructor(private workoutsState: WorkoutsFacade, private router: Router) {}
}
