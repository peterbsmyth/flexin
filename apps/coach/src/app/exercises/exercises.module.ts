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

@NgModule({
  declarations: [ExerciseFormComponent, CreatePage, ExercisesPage, ExercisePage],
  imports: [
    CommonModule,
    CoachingDomainModule,
    ReactiveFormsModule,
    ExercisesRoutingModule,
    BodComponentsModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule,
    ReactiveComponentModule
  ],
})
export class ExercisesModule {}
