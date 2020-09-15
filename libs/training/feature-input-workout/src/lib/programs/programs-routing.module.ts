import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsPage } from './pages/programs/programs.page';
import { ProgramPage } from './pages/program/program.page';
import { WeeksPage } from './pages/weeks/weeks.page';
import { ProgramExistsGuard } from './program-exists.guard';

const routes: Routes = [
  {
    path: 'programs',
    component: ProgramsPage,
  },
  {
    path: 'programs/:programId',
    component: ProgramPage,
    canActivate: [ProgramExistsGuard],
    children: [
      {
        path: '',
        component: WeeksPage
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }