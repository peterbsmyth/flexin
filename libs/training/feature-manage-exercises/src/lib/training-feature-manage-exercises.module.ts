import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BodComponentsModule } from '@bod/shared/components';
import { TrainingDomainModule } from '@bod/training/domain';
import { TrainingUiComponentsModule } from '@bod/training/ui-components';
import { ReactiveComponentModule } from '@ngrx/component';
import { ExerciseTableComponent } from './containers/exercise-table/exercise-table.component';
import { ExerciseCreatePage } from './pages/exercise-create/exercise-create.page';
import { ExercisePage } from './pages/exercise/exercise.page';
import { ExercisesPage } from './pages/exercises/exercises.page';
import { TrainingFeatureManageExercisesRoutingModule } from './training-feature-manage-exercises-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingDomainModule,
    TrainingFeatureManageExercisesRoutingModule,
    ReactiveComponentModule,
    BodComponentsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    TrainingUiComponentsModule,
  ],
  declarations: [
    ExerciseTableComponent,
    ExercisePage,
    ExercisesPage,
    ExerciseCreatePage,
  ],
  exports: [],
})
export class TrainingFeatureManageExercisesModule {}
