import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import * as fromRoot from '../+state/root.reducer';
import * as FoodsSelectors from '../+state/foods/foods.selectors';

@Injectable()
export class FoodsFacade {
  loaded$ = this.store.pipe(select(FoodsSelectors.getFoodsLoaded));
  allFoods$ = this.store.pipe(select(FoodsSelectors.getAllFoods));
  selectedFoods$ = this.store.pipe(select(FoodsSelectors.getSelected));

  constructor(private store: Store<fromRoot.PartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}