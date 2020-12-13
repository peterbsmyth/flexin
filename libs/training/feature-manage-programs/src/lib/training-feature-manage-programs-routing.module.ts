import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramsLoadedGuard } from './guards/programs-loaded.guard';
import { ExercisePage } from './pages/exercise/exercise.page';
import { ProgramBoardPage } from './pages/program-board/program-board.page';
import { ProgramCreatePage } from './pages/program-create/program-create.page';
import { ProgramPage } from './pages/program/program.page';
import { StatisticsPage } from './pages/statistics/statistics.page';
import { WorkoutConfigurationBoardPage } from './pages/workout-configuration-board/workout-configuration-board.page';

const routes: Routes = [
  {
    path: 'programs',
    component: ProgramPage,
    canActivate: [ProgramsLoadedGuard],
  },
  {
    path: 'programs/create',
    component: ProgramCreatePage,
    children: [
      {
        path: '',
        redirectTo: 'start',
        pathMatch: 'full',
      },
      {
        path: 'start',
        component: ProgramBoardPage,
      },
      {
        path: 'finish',
        component: WorkoutConfigurationBoardPage,
      },
    ],
  },
  {
    path: 'statistics/programs',
    component: StatisticsPage,
    canActivate: [ProgramsLoadedGuard],
  },
  {
    path: 'statistics/exercises',
    component: ExercisePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingFeatureManageProgramsRoutingModule {}
