import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDomainModule } from '@bod/training/domain';
import { BodComponentsModule } from '@bod/shared/components';
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
