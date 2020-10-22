import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDomainModule } from '@bod/training/domain';
import { BodComponentsModule } from '@bod/shared/components';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { ExerciseCreatePage } from './pages/exercise-create/exercise-create.page';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ExercisesPage } from './pages/exercises/exercises.page';
import { MatListModule } from '@angular/material/list';
import { ExercisePage } from './pages/exercise/exercise.page';
import { ReactiveComponentModule } from '@ngrx/component';
import { ExerciseTableComponent } from './components/exercise-table/exercise-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { TrainingFeatureCreateProgramRoutingModule } from './training-feature-create-program-routing.module';
import { BoardComponent } from './components/board/board.component';
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
import { ExerciseDialog } from './components/exercise-dialog/exercise.dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { SessionItemPage } from './pages/session-item/session-item.page';
import { SessionItemFormComponent } from './components/session-item-form/session-item-form.component';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';

@NgModule({
  declarations: [
    ExerciseFormComponent,
    ExerciseTableComponent,
    ExerciseCreatePage,
    ExercisesPage,
    ExercisePage,
    BoardComponent,
    BoardCardComponent,
    SessionItemComponent,
    ProgramCreatePage,
    ProgramsPage,
    ProgramPage,
    ProgramBoardPage,
    SessionConfigurationBoardPage,
    ProgramBoardComponent,
    NumericDirective,
    ExerciseDialog,
    SessionItemPage,
    SessionItemFormComponent,
    ExerciseCardComponent,
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
    TrainingFeatureCreateProgramRoutingModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatSelectModule,
    MatDialogModule,
  ],
  exports: [],
})
export class CoachingFeatureCreateProgramModule {}
