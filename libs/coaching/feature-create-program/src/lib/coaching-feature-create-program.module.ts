import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachingDomainModule } from '@bod/coaching/domain';
import { ProgramsModule } from './programs/programs.module';
import { ExercisesModule } from './exercises/exercises.module';

@NgModule({
  imports: [
    CommonModule,
    CoachingDomainModule,
    ProgramsModule,
    ExercisesModule,
  ],
  declarations: [],
  exports: [],
})
export class CoachingFeatureCreateProgramModule {}
