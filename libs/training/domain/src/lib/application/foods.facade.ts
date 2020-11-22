import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { TrainingState } from '../+state/state';
import * as FoodsSelectors from '../+state/foods/foods.selectors';

@Injectable({ providedIn: 'root' })
export class FoodsFacade {
  loaded$ = this.store.pipe(select(FoodsSelectors.getFoodsLoaded));
  allFoods$ = this.store.pipe(select(FoodsSelectors.getAllFoods));
  selectedFoods$ = this.store.pipe(select(FoodsSelectors.getSelected));

  constructor(private store: Store<TrainingState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
