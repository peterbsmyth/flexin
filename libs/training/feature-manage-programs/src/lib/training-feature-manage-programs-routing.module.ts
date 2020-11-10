import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramCreatePage } from './pages/program-create/program-create.page';
import { ProgramsPage } from './pages/programs/programs.page';
import { ProgramPage } from './pages/program/program.page';
import { ProgramConfigurationBoardPage } from './pages/program-configuration-board/program-configuration-board.page';
import { ProgramBoardPage } from './pages/program-board/program-board.page';
import { ProgramExistsGuard } from './guards/program-exists.guard';
import { WorkoutPage } from './pages/workout/workout.page';
import { WorkoutExistsGuard } from './guards/workout-exists.guard';

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
        component: ProgramConfigurationBoardPage,
      },
    ],
  },
  {
    path: 'v2/programs/:programId',
    component: ProgramPage,
    canActivate: [ProgramExistsGuard],
  },
  {
    path: 'v2/coaching/workouts/:workoutId',
    component: WorkoutPage,
    canActivate: [WorkoutExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingFeatureManageProgramsRoutingModule {}
