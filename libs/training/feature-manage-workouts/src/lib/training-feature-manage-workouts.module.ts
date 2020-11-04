import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDomainModule } from '@bod/training/domain';
import { TrainingFeatureManageWorkoutsRoutingModule } from './training-feature-manage-workouts-routing.module';
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
import { ProgramPage } from './pages/program/program.page';
import { ProgramsPage } from './pages/programs/programs.page';
import { WeeksPage } from './pages/weeks/weeks.page';
import { StatisticsContainer } from './containers/statistics/statistics.container';

@NgModule({
  imports: [
    CommonModule,
    TrainingDomainModule,
    TrainingFeatureManageWorkoutsRoutingModule,
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
export class TrainingFeatureManageWorkoutsModule {}
