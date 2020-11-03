import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromRoot from '../+state/root.reducer';
import * as CategoriesSelectors from '../+state/categories/categories.selectors';

@Injectable()
export class CategoriesFacade {
  loaded$ = this.store.pipe(select(CategoriesSelectors.getCategoriesLoaded));
  allCategories$ = this.store.pipe(
    select(CategoriesSelectors.getAllCategories)
  );
  selectedCategories$ = this.store.pipe(
    select(CategoriesSelectors.getSelected)
  );

  constructor(private store: Store<fromRoot.PartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
