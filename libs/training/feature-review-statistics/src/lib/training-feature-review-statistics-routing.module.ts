import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExercisePage } from './pages/exercise/exercise.page';
import { ExercisesPage } from './pages/exercises/exercises.page';
import { StatisticsPage } from './pages/statistics/statistics.page';
import { StatisticsLoadedGuard } from './statistics-loaded.guard';

const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsPage,
    canActivate: [StatisticsLoadedGuard],
    children: [
      {
        path: 'exercises',
        component: ExercisesPage
      },
      {
        path: 'exercises/:exerciseId',
        component: ExercisePage
      },
      {
        path: '',
        redirectTo: 'exercises',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TrainingFeatureReviewStatisticsRoutingModule { }
