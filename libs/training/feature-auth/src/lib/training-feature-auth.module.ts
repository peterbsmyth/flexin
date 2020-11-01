import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDomainModule } from '@bod/training/domain';
import { AuthComponent } from './auth.component';
import { TrainingFeatureAuthRoutingModule } from './training-feature-auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingDomainModule,
    TrainingFeatureAuthRoutingModule,
  ],
  declarations: [AuthComponent],
  exports: [AuthComponent],
})
export class TrainingFeatureAuthModule {}
