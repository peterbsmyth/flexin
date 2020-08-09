import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProgramService } from './program.service';
import { ExerciseService } from './exercise.service';
import { SessionService } from './session.service';
import { WeekService } from './week.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ProgramService,
    ExerciseService,
    SessionService,
    WeekService
  ]
})
export class DataModule {}
