import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExercisePage } from './pages/exercise/exercise.page';
import { ExercisesPage } from './pages/exercises/exercises.page';
import { WeekStatisticsPage } from './pages/week-statistics/week-statistics.page';
import { StatisticsPage } from './pages/statistics/statistics.page';
import { StatisticsLoadedGuard, WeekStatisticLoadedGuard } from './guards';

const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsPage,
    // canActivate: [StatisticsLoadedGuard],
    children: [
      {
        path: 'week-statistics/:weekStatisticId',
        component: WeekStatisticsPage,
        canActivate: [WeekStatisticLoadedGuard],
      },
      {
        path: 'exercises',
        component: ExercisesPage,
      },
      {
        path: 'exercises/:exerciseId',
        component: ExercisePage,
      },
      {
        path: '',
        redirectTo: 'week-statistics/24',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingFeatureReviewStatisticsRoutingModule {}
