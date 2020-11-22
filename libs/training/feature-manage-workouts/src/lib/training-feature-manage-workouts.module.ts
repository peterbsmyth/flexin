import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDomainModule } from '@bod/training/domain';
import { TrainingFeatureManageWorkoutsRoutingModule } from './training-feature-manage-workouts-routing.module';
import { MatListModule } from '@angular/material/list';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { WorkoutCardComponent } from './components/workout-card/workout-card.component';
import { BodComponentsModule } from '@bod/shared/components';
import { WorkoutsPage } from './pages/workouts/workouts.page';
import { StatisticsContainer } from './containers/statistics/statistics.container';
import { TrainingUiComponentsModule } from '@bod/training/ui-components';
import { WindowRef } from '@bod/shared/utils';

@NgModule({
  imports: [
    CommonModule,
    TrainingDomainModule,
    TrainingFeatureManageWorkoutsRoutingModule,
    TrainingUiComponentsModule,
    MatListModule,
    ReactiveComponentModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    BodComponentsModule,
    MatSnackBarModule,
  ],
  declarations: [WorkoutCardComponent, WorkoutsPage, StatisticsContainer],
  providers: [WindowRef],
  exports: [],
})
export class TrainingFeatureManageWorkoutsModule {}
