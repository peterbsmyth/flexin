import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramCreatePage } from './pages/program-create/program-create.page';
import { ProgramsPage } from './pages/programs/programs.page';
import { ProgramPage } from './pages/program/program.page';
import { SessionConfigurationBoardPage } from './pages/session-configuration-board/session-configuration-board.page';
import { ProgramBoardPage } from './pages/program-board/program-board.page';
import { ProgramExistsGuard } from './guards/program-exists.guard';
import { SessionItemPage } from './pages/session-item/session-item.page';
import { SessionItemExistsGuard } from './guards/session-item-exists.guard';

const routes: Routes = [
  {
    path: 'v2/programs',
    component: ProgramsPage,
  },
  {
    path: 'v2/programs/create',
    component: ProgramCreatePage,
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
    path: 'v2/programs/:programId',
    component: ProgramPage,
    canActivate: [ProgramExistsGuard],
  },
  {
    path: 'v2/session-items/:sessionItemId',
    component: SessionItemPage,
    canActivate: [SessionItemExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingFeatureManageProgramsRoutingModule {}
