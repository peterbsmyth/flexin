import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingDomainModule } from '@bod/training/domain';
import { ExerciseDialog } from './components/exercise-dialog/exercise.dialog';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { ExerciseTableComponent } from './components/exercise-table/exercise-table.component';
import { ExercisePage } from './pages/exercise/exercise.page';
import { ExerciseCreatePage } from './pages/exercise-create/exercise-create.page';
import { ExercisesPage } from './pages/exercises/exercises.page';
import { BodComponentsModule } from '@bod/shared/components';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TrainingFeatureManageExercisesRoutingModule } from './training-feature-manage-exercises-routing.module';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    TrainingDomainModule,
    TrainingFeatureManageExercisesRoutingModule,
    ReactiveComponentModule,
    BodComponentsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
  ],
  declarations: [
    ExerciseDialog,
    ExerciseFormComponent,
    ExerciseTableComponent,
    ExercisePage,
    ExercisesPage,
    ExerciseCreatePage,
  ],
  exports: [],
})
export class TrainingFeatureManageExercisesModule {}
