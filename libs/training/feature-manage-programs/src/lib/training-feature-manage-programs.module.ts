import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDomainModule } from '@bod/training/domain';
import { BodComponentsModule } from '@bod/shared/components';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { ProgramCreatePage } from './pages/program-create/program-create.page';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { ProgramPage } from './pages/program/program.page';
import { ProgramBoardPage } from './pages/program-board/program-board.page';
import { ProgramConfigurationBoardPage } from './pages/program-configuration-board/program-configuration-board.page';
import { ProgramBoardComponent } from './components/program-board/program-board.component';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NumericDirective } from './components/workout/numeric.directive';
import { WorkoutPage } from './pages/workout/workout.page';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { TrainingFeatureManageProgramsRoutingModule } from './training-feature-manage-programs-routing.module';
import { TrainingUiComponentsModule } from '@bod/training/ui-components';
import { StatisticsPage } from './pages/statistics/statistics.page';
import { WorkoutStatisticCardComponent } from './components/workout-statistic-card/workout-statistic-card.component';
import { ExercisePage } from './pages/exercise/exercise.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    BoardCardComponent,
    WorkoutComponent,
    ProgramCreatePage,
    ProgramPage,
    ProgramBoardPage,
    ProgramConfigurationBoardPage,
    ProgramBoardComponent,
    NumericDirective,
    WorkoutPage,
    WorkoutFormComponent,
    StatisticsPage,
    WorkoutStatisticCardComponent,
    ExercisePage,
  ],
  imports: [
    CommonModule,
    TrainingDomainModule,
    TrainingUiComponentsModule,
    ReactiveFormsModule,
    BodComponentsModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    NgxChartsModule,
    MatSortModule,
    MatCardModule,
    ReactiveComponentModule,
    TrainingFeatureManageProgramsRoutingModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatSelectModule,
  ],
})
export class TrainingFeatureManageProgramsModule {}
