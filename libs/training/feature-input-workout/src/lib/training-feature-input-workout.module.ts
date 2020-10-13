import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDomainModule } from '@bod/training/domain';
import { TrainingFeatureInputWorkoutRoutingModule } from './training-feature-input-workout-routing.module';
import { MatListModule } from '@angular/material/list';
import { WeekPage } from './pages/week/week.page';
import { ReactiveComponentModule } from '@ngrx/component';
import { SessionsPage } from './pages/sessions/sessions.page';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SessionPage } from './pages/session/session.page';
import { SessionItemPage } from './pages/session-item/session-item.page';
import { SessionItemCardComponent } from './components/session-item-card/session-item-card.component';
import { BodComponentsModule } from '@bod/shared/components';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { MaximumAttemptPage } from './pages/maximum-attempt/maximum-attempt.page';
import { MaximumAttemptCardComponent } from './components/maximum-attempt-card/maximum-attempt-card.component';
import { MaximumAttemptFormComponent } from './components/maximum-attempt-form/maximum-attempt-form.component';
import { ProgramPage } from './pages/program/program.page';
import { ProgramsPage } from './pages/programs/programs.page';
import { WeeksPage } from './pages/weeks/weeks.page';
import { StatisticsContainer } from './containers/statistics/statistics.container';

@NgModule({
  imports: [
    CommonModule,
    TrainingDomainModule,
    TrainingFeatureInputWorkoutRoutingModule,
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
  declarations: [
    WeekPage,
    SessionsPage,
    ActionBarComponent,
    MaximumAttemptPage,
    MaximumAttemptCardComponent,
    MaximumAttemptFormComponent,
    SessionPage,
    SessionItemPage,
    SessionItemCardComponent,
    ProgramPage,
    ProgramsPage,
    WeeksPage,
    StatisticsContainer,
  ],
  exports: [],
})
export class TrainingFeatureInputWorkoutModule {}
