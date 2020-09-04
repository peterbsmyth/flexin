import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramPage } from './pages/program/program.page';
import { ProgramsPage } from './pages/programs/programs.page';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPrograms from './+state/programs.reducer';
import { ProgramsEffects } from './+state/programs.effects';

@NgModule({
  declarations: [ProgramPage, ProgramsPage],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    MatListModule,
    StoreModule.forFeature(
      fromPrograms.PROGRAMS_FEATURE_KEY,
      fromPrograms.reducer
    ),
    EffectsModule.forFeature([ProgramsEffects]),
  ],
})
export class ProgramsModule {}
