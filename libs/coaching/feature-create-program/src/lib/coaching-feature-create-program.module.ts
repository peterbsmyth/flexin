import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachingDomainModule } from '@bod/coaching/domain';
import { ProgramsModule } from './programs/programs.module';
import { ExercisesModule } from './exercises/exercises.module';
import { SessionItemsModule } from './session-items/session-items.module';

@NgModule({
  imports: [
    CommonModule,
    CoachingDomainModule,
    ProgramsModule,
    ExercisesModule,
    SessionItemsModule
  ],
  declarations: [],
  exports: [],
})
export class CoachingFeatureCreateProgramModule {}
