import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsLoadedGuard } from './guards/programs-loaded.guard';
import { WorkoutsPage } from './pages/workouts/workouts.page';

const routes: Routes = [
  {
    path: 'workouts',
    component: WorkoutsPage,
    canActivate: [ProgramsLoadedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingFeatureManageWorkoutsRoutingModule {}
