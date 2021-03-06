import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import {
  ExercisesFacade,
  loadExerciseFromGuard,
  selectExerciseFromGuard,
} from '@bod/training/domain';
import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  switchMapTo,
  take,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExerciseExistsGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasExercise(next.params['exerciseId']);
  }

  hasExerciseInStore(): Observable<boolean> {
    return this.exercisesState.selectedExercises$.pipe(
      map((exercise) => !!exercise)
    );
  }

  hasExercise(id: string): Observable<boolean> {
    /**
     * if there is a result from selected exercise, cool
     */
    this.exercisesState.dispatch(selectExerciseFromGuard({ id: +id }));
    return this.hasExerciseInStore().pipe(
      take(1),
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        } else {
          this.exercisesState.dispatch(loadExerciseFromGuard({ id: +id }));
          return this.waitForCollectionToLoad().pipe(
            switchMapTo(this.exercisesState.selectedExercises$),
            map((exercise) => !!exercise),
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
    return this.exercisesState.loaded$.pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }

  constructor(
    private exercisesState: ExercisesFacade,
    private router: Router
  ) {}
}
