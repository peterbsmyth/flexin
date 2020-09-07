import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSessionItems from './+state/session-items/session-items.reducer';
import { SessionItemsEffects } from './+state/session-items/session-items.effects';
import { SessionItemsFacade } from './application/session-items.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSessionItems.SESSIONITEMS_FEATURE_KEY,
      fromSessionItems.reducer
    ),
    EffectsModule.forFeature([SessionItemsEffects]),
  ],
  providers: [SessionItemsFacade],
})
export class TrainingDomainModule {}
