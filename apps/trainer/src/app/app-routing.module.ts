import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramBoardComponent } from './program-board/program-board.component';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { SessionGridComponent } from './session-grid/session-grid.component';
import { SessionConfigurationBoardComponent } from './session-configuration-board/session-configuration-board.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramBoardComponent
  },
  {
    path: 'add',
    component: ExerciseFormComponent
  },
  {
    path: 'configure-session',
    component: SessionConfigurationBoardComponent
  },
  {
    path: 'session',
    component: SessionGridComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { } 