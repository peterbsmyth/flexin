import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDomainModule } from '@bod/training/domain';
import { StatisticsPage } from './pages/statistics/statistics.page';
import { TrainingFeatureReviewStatisticsRoutingModule } from './training-feature-review-statistics-routing.module';
import { MatListModule } from '@angular/material/list';
import { ExercisesPage } from './pages/exercises/exercises.page';
import { BodComponentsModule } from '@bod/shared/components';

@NgModule({
  imports: [
    CommonModule,
    TrainingDomainModule,
    TrainingFeatureReviewStatisticsRoutingModule,
    BodComponentsModule,
    MatListModule
  ],
  declarations: [StatisticsPage, ExercisesPage],
  exports: [],
})
export class TrainingFeatureReviewStatisticsModule {}
