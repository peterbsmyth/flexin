import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BodComponentsModule } from '@bod/shared/components';
import { TrainingDomainModule } from '@bod/training/domain';
import { AuthPage } from './pages/auth.page';
import { TrainingFeatureAuthRoutingModule } from './training-feature-auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingDomainModule,
    TrainingFeatureAuthRoutingModule,
    BodComponentsModule,
  ],
  declarations: [AuthPage],
})
export class TrainingFeatureAuthModule {}
