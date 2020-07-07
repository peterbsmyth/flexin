import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProgramStatistics from './+state/program-statistics/program-statistics.reducer';
import { ProgramStatisticsEffects } from './+state/program-statistics/program-statistics.effects';
import * as fromPrograms from './+state/programs/programs.reducer';
import { ProgramsEffects } from './+state/programs/programs.effects';
import * as fromWeeks from './+state/weeks/weeks.reducer';
import { WeeksEffects } from './+state/weeks/weeks.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromProgramStatistics.PROGRAMSTATISTICS_FEATURE_KEY,
      fromProgramStatistics.reducer
    ),
    EffectsModule.forFeature([ProgramStatisticsEffects]),
    StoreModule.forFeature(
      fromPrograms.PROGRAMS_FEATURE_KEY,
      fromPrograms.reducer
    ),
    EffectsModule.forFeature([ProgramsEffects]),
    StoreModule.forFeature(fromWeeks.WEEKS_FEATURE_KEY, fromWeeks.reducer),
    EffectsModule.forFeature([WeeksEffects]),
  ],
})
export class StateModule {}
