import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePage } from './pages/create/create.page';
import { ProgramsPage } from './pages/programs/programs.page';
import { ProgramPage } from './pages/program/program.page';
import { SessionConfigurationBoardPage } from './pages/session-configuration-board/session-configuration-board.page';
import { ProgramBoardPage } from './pages/program-board/program-board.page';
import { ProgramExistsGuard } from './program-exists.guard';

const routes: Routes = [
  {
    path: 'programs',
    component: ProgramsPage,
  },
  {
    path: 'programs/create',
    component: CreatePage,
    children: [
      {
        path: '',
        redirectTo: '1',
        pathMatch: 'full',
      },
      {
        path: '1',
        component: ProgramBoardPage,
      },
      {
        path: '2',
        component: SessionConfigurationBoardPage,
      },
    ],
  },
  {
    path: 'programs/:programId',
    component: ProgramPage,
    canActivate: [ProgramExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramsRoutingModule {}
