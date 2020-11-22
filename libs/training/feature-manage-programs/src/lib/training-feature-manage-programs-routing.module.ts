import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramCreatePage } from './pages/program-create/program-create.page';
import { ProgramPage } from './pages/program/program.page';
import { ProgramConfigurationBoardPage } from './pages/program-configuration-board/program-configuration-board.page';
import { ProgramBoardPage } from './pages/program-board/program-board.page';
import { WorkoutPage } from './pages/workout/workout.page';
import { WorkoutExistsGuard } from './guards/workout-exists.guard';
import { ProgramsLoadedGuard } from './guards/programs-loaded.guard';

const routes: Routes = [
  {
    path: 'v2/programs',
    component: ProgramPage,
    canActivate: [ProgramsLoadedGuard],
  },
  {
    path: 'v2/programs/create',
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
        component: ProgramConfigurationBoardPage,
      },
    ],
  },
  {
    path: 'v2/programs/workouts/:workoutId',
    component: WorkoutPage,
    canActivate: [WorkoutExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingFeatureManageProgramsRoutingModule {}
