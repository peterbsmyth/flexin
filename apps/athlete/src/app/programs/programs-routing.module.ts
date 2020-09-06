import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsPage } from './pages/programs/programs.page';
import { ProgramPage } from './pages/program/program.page';

const routes: Routes = [
  {
    path: 'programs',
    component: ProgramsPage,
  },
  {
    path: 'programs/:programId',
    component: ProgramPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
