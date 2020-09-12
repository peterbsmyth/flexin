import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDomainModule } from '@bod/training/domain';
import { ProgramsModule } from './programs/programs.module';
import { WeeksModule } from './weeks/weeks.module';
import { SessionsModule } from './sessions/sessions.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingDomainModule,
    ProgramsModule,
    WeeksModule,
    SessionsModule,
  ],
  declarations: [],
  exports: [],
})
export class TrainingFeatureInputWorkoutModule {}
