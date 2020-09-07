import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPrograms from './+state/programs/programs.reducer';
import * as fromSessions from './+state/sessions/sessions.reducer';
import * as fromSessionItems from './+state/session-items/session-items.reducer';
import * as fromWeeks from './+state/weeks/weeks.reducer';
import { ProgramsEffects } from './+state/programs/programs.effects';
import { SessionItemsEffects } from './+state/session-items/session-items.effects';
import { SessionsEffects } from './+state/sessions/sessions.effects';
import { WeeksEffects } from './+state/weeks/weeks.effects';
import { ProgramsFacade } from './application/programs.facade';
import { SessionItemsFacade } from './application/session-items.facade';
import { SessionsFacade } from './application/sessions.facade';
import { WeeksFacade } from './application/weeks.facade';
import { ProgramDataService } from './infrastructure/program.data.service';
import { HttpClientModule } from '@angular/common/http';
import { SessionDataService } from './infrastructure/session.data.service';
import { SessionItemDataService } from './infrastructure/session-item.data.service';
import { WeekDataService } from './infrastructure/week.data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(
      fromPrograms.PROGRAMS_FEATURE_KEY,
      fromPrograms.reducer
    ),
    StoreModule.forFeature(
      fromSessionItems.SESSIONITEMS_FEATURE_KEY,
      fromSessionItems.reducer
    ),
    StoreModule.forFeature(
      fromSessions.SESSIONS_FEATURE_KEY,
      fromSessions.reducer
    ),
    StoreModule.forFeature(
      fromWeeks.WEEKS_FEATURE_KEY,
      fromWeeks.reducer
    ),
    EffectsModule.forFeature([
      ProgramsEffects,
      SessionItemsEffects,
      SessionsEffects,
      WeeksEffects,
    ]),
  ],
  providers: [
    ProgramDataService,
    SessionItemDataService,
    SessionDataService,
    WeekDataService,
    ProgramsFacade,
    SessionItemsFacade,
    SessionsFacade,
    WeeksFacade,
  ],
})
export class TrainingDomainModule {}
