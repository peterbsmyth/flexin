import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import * as FoodsSelectors from '../+state/foods/foods.selectors';
import { TrainingState } from '../+state/state';

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
