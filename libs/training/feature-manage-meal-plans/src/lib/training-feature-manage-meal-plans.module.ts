import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDomainModule } from '@bod/training/domain';
import { TrainingFeatureManageMealPlansRoutingModule } from './training-feature-manage-meal-plans-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingDomainModule,
    TrainingFeatureManageMealPlansRoutingModule,
  ],
  declarations: [],
  exports: [],
})
export class TrainingFeatureManageMealPlansModule {}
