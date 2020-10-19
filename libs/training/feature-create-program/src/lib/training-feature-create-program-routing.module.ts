import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseCreatePage } from './pages/exercise-create/exercise-create.page';
import { ExercisePage } from './pages/exercise/exercise.page';
import { ExercisesPage } from './pages/exercises/exercises.page';
import { ExerciseExistsGuard } from './guards/exercise-exists.guard';
import { ProgramCreatePage } from './pages/program-create/program-create.page';
import { ProgramsPage } from './pages/programs/programs.page';
import { ProgramPage } from './pages/program/program.page';
import { SessionConfigurationBoardPage } from './pages/session-configuration-board/session-configuration-board.page';
import { ProgramBoardPage } from './pages/program-board/program-board.page';
import { ProgramExistsGuard } from './guards/program-exists.guard';
import { SessionItemPage } from './pages/session-item/session-item.page';
import { SessionItemExistsGuard } from './guards/session-item-exists.guard';

const routes: Routes = [
  { path: 'exercises', component: ExercisesPage },
  { path: 'exercises/create', component: ExerciseCreatePage },
  {
    path: 'exercises/:exerciseId',
    component: ExercisePage,
    canActivate: [ExerciseExistsGuard],
  },
  {
    path: 'programs',
    component: ProgramsPage,
  },
  {
    path: 'programs/create',
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
    path: 'programs/:programId',
    component: ProgramPage,
    canActivate: [ProgramExistsGuard],
  },
  {
    path: 'session-items/:sessionItemId',
    component: SessionItemPage,
    canActivate: [SessionItemExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingFeatureCreateProgramRoutingModule {}
