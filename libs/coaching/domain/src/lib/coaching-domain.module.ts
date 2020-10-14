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
import { ExerciseDataService } from './infrastructure/exercise.data.service';
import * as fromExercises from './+state/exercises/exercises.reducer';
import { ExercisesEffects } from './+state/exercises/exercises.effects';
import { ExercisesFacade } from './application/exercises.facade';
import { DraftProgramsDataService } from './infrastructure/draft-programs.data.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    StoreModule.forFeature(fromWeeks.WEEKS_FEATURE_KEY, fromWeeks.reducer),
    EffectsModule.forFeature([
      ProgramsEffects,
      SessionItemsEffects,
      SessionsEffects,
      WeeksEffects,
    ]),
    StoreModule.forFeature(
      fromExercises.EXERCISES_FEATURE_KEY,
      fromExercises.reducer
    ),
    EffectsModule.forFeature([ExercisesEffects]),
    MatSnackBarModule,
  ],
  providers: [
    ExerciseDataService,
    ProgramDataService,
    SessionItemDataService,
    SessionDataService,
    WeekDataService,
    ExercisesFacade,
    ProgramsFacade,
    SessionItemsFacade,
    SessionsFacade,
    WeeksFacade,
    DraftProgramsDataService,
  ],
})
export class CoachingDomainModule {}
