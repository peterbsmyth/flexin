import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeksRoutingModule } from './weeks-routing.module';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromWeeks from './+state/weeks.reducer';
import { WeeksEffects } from './+state/weeks.effects';
import { WeekPage } from './pages/week/week.page';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [
    WeekPage
  ],
  imports: [
    CommonModule,
    WeeksRoutingModule,
    MatListModule,
    StoreModule.forFeature(fromWeeks.WEEKS_FEATURE_KEY, fromWeeks.reducer),
    EffectsModule.forFeature([WeeksEffects]),
    ReactiveComponentModule,
  ],
})
export class WeeksModule {}
