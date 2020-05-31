import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramBoardComponent } from './program-board/program-board.component';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramBoardComponent
  },
  {
    path: 'add',
    component: ExerciseFormComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { } 