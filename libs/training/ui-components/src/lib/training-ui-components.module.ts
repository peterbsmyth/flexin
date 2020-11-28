import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersContainer } from './filters/filters.container';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ExerciseDialog } from './exercise-dialog/exercise.dialog';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
