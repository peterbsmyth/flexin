import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsLoadedGuard } from './guards/programs-loaded.guard';
import { StatisticsPage } from './pages/statistics/statistics.page';
import { WorkoutsPage } from './pages/workouts/workouts.page';

const routes: Routes = [
  {
    path: 'workouts',
    component: WorkoutsPage,
    canActivate: [ProgramsLoadedGuard],
  },
  {
    path: 'v2/statistics',
    component: StatisticsPage,
    canActivate: [ProgramsLoadedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingFeatureManageWorkoutsRoutingModule {}
