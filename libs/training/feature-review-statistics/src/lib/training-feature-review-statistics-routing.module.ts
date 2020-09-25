import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExercisePage } from './pages/exercise/exercise.page';
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
  },
  {
    path: 'statistics/exercises/:exerciseId',
    component: ExercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TrainingFeatureReviewStatisticsRoutingModule { }
