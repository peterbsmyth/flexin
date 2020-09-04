import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProgramStatistics from './+state/program-statistics/program-statistics.reducer';
import { ProgramStatisticsEffects } from './+state/program-statistics/program-statistics.effects';
import * as fromPlaylists from './+state/playlists/playlists.reducer';
import { PlaylistsEffects } from './+state/playlists/playlists.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromProgramStatistics.PROGRAMSTATISTICS_FEATURE_KEY,
      fromProgramStatistics.reducer
    ),
    EffectsModule.forFeature([ProgramStatisticsEffects]),
    StoreModule.forFeature(
      fromPlaylists.PLAYLISTS_FEATURE_KEY,
      fromPlaylists.reducer
    ),
    EffectsModule.forFeature([PlaylistsEffects]),
  ],
})
export class StateModule {}
