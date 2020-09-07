import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeksRoutingModule } from './weeks-routing.module';
import { MatListModule } from '@angular/material/list';
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
    ReactiveComponentModule,
  ],
})
export class WeeksModule {}
