import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BodComponentsModule } from '@bod/shared/components';
import { WindowRef } from '@bod/shared/utils';
import { TrainingDomainModule } from '@bod/training/domain';
import { TrainingUiComponentsModule } from '@bod/training/ui-components';
import { ReactiveComponentModule } from '@ngrx/component';
import { WorkoutCardComponent } from './components/workout-card/workout-card.component';
import { StatisticsContainer } from './containers/statistics/statistics.container';
import { WorkoutsPage } from './pages/workouts/workouts.page';
import { TrainingFeatureManageWorkoutsRoutingModule } from './training-feature-manage-workouts-routing.module';
import { NoWorkoutsPage } from './pages/no-workouts/no-workouts.page';

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
  declarations: [WorkoutCardComponent, WorkoutsPage, StatisticsContainer, NoWorkoutsPage],
  providers: [WindowRef],
  exports: [],
})
export class TrainingFeatureManageWorkoutsModule {}
