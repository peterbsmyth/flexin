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
import { SessionItemComponent } from './components/session-item/session-item.component';
import { ProgramPage } from './pages/program/program.page';
import { ProgramBoardPage } from './pages/program-board/program-board.page';
import { SessionConfigurationBoardPage } from './pages/session-configuration-board/session-configuration-board.page';
import { ProgramBoardComponent } from './components/program-board/program-board.component';
import { ProgramsPage } from './pages/programs/programs.page';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NumericDirective } from './components/session-item/numeric.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { WorkoutPage } from './pages/workout/workout.page';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { TrainingFeatureManageProgramsRoutingModule } from './training-feature-manage-programs-routing.module';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { ExerciseDialog } from './components/exercise-dialog/exercise.dialog';

@NgModule({
  declarations: [
    ExerciseDialog,
    ExerciseFormComponent,
    BoardCardComponent,
    SessionItemComponent,
    ProgramCreatePage,
    ProgramsPage,
    ProgramPage,
    ProgramBoardPage,
    SessionConfigurationBoardPage,
    ProgramBoardComponent,
    NumericDirective,
    WorkoutPage,
    WorkoutFormComponent,
  ],
  imports: [
    CommonModule,
    TrainingDomainModule,
    ReactiveFormsModule,
    BodComponentsModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    ReactiveComponentModule,
    TrainingFeatureManageProgramsRoutingModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatSelectModule,
    MatDialogModule,
  ],
})
export class TrainingFeatureManageProgramsModule {}
