import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import {
  CategoriesFacade,
  loadCategory,
  selectCategory,
} from '@bod/training/domain';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMapTo, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryLoadedGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const id = next.params['categoryId'];
    this.categoriesState.dispatch(loadCategory({ id }));
    this.categoriesState.dispatch(selectCategory({ id }));
    return this.waitForCollectionToLoad().pipe(
      switchMapTo(this.categoriesState.selectedCategories$),
      map((category) => !!category),
      catchError((err) => {
        console.log(err);
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  waitForCollectionToLoad(): Observable<boolean> {
    return this.categoriesState.loaded$.pipe(
      filter((loaded) => loaded),
      take(1)
    );
  }

  constructor(
    private categoriesState: CategoriesFacade,
    private router: Router
  ) {}
}
