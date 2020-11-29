import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as CategoriesSelectors from '../+state/categories/categories.selectors';
import { TrainingState } from '../+state/state';

@Injectable({ providedIn: 'root' })
export class CategoriesFacade {
  loaded$ = this.store.pipe(select(CategoriesSelectors.getCategoriesLoaded));
  allCategories$ = this.store.pipe(
    select(CategoriesSelectors.getAllCategories)
  );
  selectedCategories$ = this.store.pipe(
    select(CategoriesSelectors.getSelected)
  );

  constructor(private store: Store<TrainingState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
