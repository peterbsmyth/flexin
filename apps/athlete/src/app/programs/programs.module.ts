import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramPage } from './pages/program/program.page';
import { ProgramsPage } from './pages/programs/programs.page';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    ProgramPage,
    ProgramsPage,
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    MatListModule
  ]
})
export class ProgramsModule { }
