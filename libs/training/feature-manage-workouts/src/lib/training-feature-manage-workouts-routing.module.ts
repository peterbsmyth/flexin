import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramsLoadedGuard } from './guards/programs-loaded.guard';
import { NoWorkoutsPage } from './pages/no-workouts/no-workouts.page';
import { WorkoutsPage } from './pages/workouts/workouts.page';

const routes: Routes = [
  {
    path: 'workouts',
    component: WorkoutsPage,
    canActivate: [ProgramsLoadedGuard],
  },
  {
    path: 'no-workouts',
    component: NoWorkoutsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingFeatureManageWorkoutsRoutingModule {}
