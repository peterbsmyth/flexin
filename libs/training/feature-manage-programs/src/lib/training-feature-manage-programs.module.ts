import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BodComponentsModule } from '@bod/shared/components';
import { TrainingDomainModule } from '@bod/training/domain';
import { TrainingUiComponentsModule } from '@bod/training/ui-components';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgGridModule } from 'ag-grid-angular';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { ProgramBoardComponent } from './components/program-board/program-board.component';
import { CheckboxRenderer } from './components/workout-configuration-grid/checkbox-renderer/checkbox.renderer';
import { WorkoutConfigurationGridComponent } from './components/workout-configuration-grid/workout-configuration-grid.component';
import { WorkoutDialog } from './components/workout-dialog/workout.dialog';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutStatisticCardComponent } from './components/workout-statistic-card/workout-statistic-card.component';
import { ExercisePage } from './pages/exercise/exercise.page';
import { ProgramBoardPage } from './pages/program-board/program-board.page';
import { ProgramCreatePage } from './pages/program-create/program-create.page';
import { ProgramPage } from './pages/program/program.page';
import { StatisticsPage } from './pages/statistics/statistics.page';
import { WorkoutConfigurationBoardPage } from './pages/workout-configuration-board/workout-configuration-board.page';
import { TrainingFeatureManageProgramsRoutingModule } from './training-feature-manage-programs-routing.module';

@NgModule({
  declarations: [
    BoardCardComponent,
    ProgramCreatePage,
    ProgramPage,
    ProgramBoardPage,
    WorkoutConfigurationBoardPage,
    ProgramBoardComponent,
    WorkoutFormComponent,
    StatisticsPage,
    WorkoutStatisticCardComponent,
    ExercisePage,
    WorkoutConfigurationGridComponent,
    CheckboxRenderer,
    WorkoutDialog,
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
    AgGridModule.withComponents([]),
  ],
})
export class TrainingFeatureManageProgramsModule {}
