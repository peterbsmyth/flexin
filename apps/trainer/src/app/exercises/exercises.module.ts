import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodComponentsModule } from '@bod/components';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { CreatePage } from './pages/create/create.page';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ExerciseFormComponent, CreatePage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExercisesRoutingModule,
    BodComponentsModule,
    MatCheckboxModule,
    MatInputModule
  ]
})
export class ExercisesModule { }
