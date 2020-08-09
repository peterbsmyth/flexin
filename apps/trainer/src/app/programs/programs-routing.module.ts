import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePage } from './pages/create/create.page';
import { ProgramBoardComponent } from './components/program-board/program-board.component';
import { SessionConfigurationBoardComponent } from './components/session-configuration-board/session-configuration-board.component';
import { SessionGridComponent } from './components/session-grid/session-grid.component';
import { HomePage } from './pages/home/home.page';
import { ProgramPage } from './pages/program/program.page';

const routes: Routes = [
  { 
    path: '',
    component: HomePage
  },
  {
    path: 'create',
    component: CreatePage,
    children: [
      {
        path: '',
        redirectTo: '1'
      },
      {
        path: '1',
        component: ProgramBoardComponent
      },
      {
        path: '2',
        component: SessionConfigurationBoardComponent
      },
      {
        path: '3',
        component: SessionGridComponent
      }
    ]
  },
  {
    path: ':id',
    component: ProgramPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
