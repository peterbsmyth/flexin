import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodComponentsModule } from '@bod/shared/components';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { CreatePage } from './pages/create/create.page';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ExercisesPage } from './pages/exercises/exercises.page';
import { MatListModule } from '@angular/material/list';
import { CoachingDomainModule } from '@bod/coaching/domain';
import { ExercisePage } from './pages/exercise/exercise.page';
import { ReactiveComponentModule } from '@ngrx/component';
import { ExerciseTableComponent } from './components/exercise-table/exercise-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    ExerciseFormComponent,
    ExerciseTableComponent,
    CreatePage,
    ExercisesPage,
    ExercisePage,
  ],
  imports: [
    CommonModule,
    CoachingDomainModule,
    ReactiveFormsModule,
    ExercisesRoutingModule,
    BodComponentsModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveComponentModule,
  ],
})
export class ExercisesModule {}
