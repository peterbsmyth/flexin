import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExercisesPage } from './pages/exercises/exercises.page';
import { StatisticsPage } from './pages/statistics/statistics.page';

const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsPage,
  },
  {
    path: 'statistics/exercises',
    component: ExercisesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TrainingFeatureReviewStatisticsRoutingModule { }
