import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersContainer } from './filters/filters.container';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  declarations: [FiltersContainer],
  exports: [FiltersContainer],
})
export class TrainingUiComponentsModule {}
