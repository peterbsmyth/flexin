import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ExerciseDialog } from './exercise-dialog/exercise.dialog';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { FiltersContainer } from './filters/filters.container';
import { IntensityFormComponent } from './intensity-form/intensity-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
  declarations: [
    FiltersContainer,
    ExerciseDialog,
    ExerciseFormComponent,
    IntensityFormComponent,
    CategoryFormComponent,
  ],
  exports: [
    FiltersContainer,
    ExerciseDialog,
    ExerciseFormComponent,
    IntensityFormComponent,
    CategoryFormComponent,
  ],
})
export class TrainingUiComponentsModule {}
