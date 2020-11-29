import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExerciseDialog } from './exercise-dialog/exercise.dialog';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { FiltersContainer } from './filters/filters.container';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  declarations: [FiltersContainer, ExerciseDialog, ExerciseFormComponent],
  exports: [FiltersContainer, ExerciseDialog, ExerciseFormComponent],
})
export class TrainingUiComponentsModule {}
