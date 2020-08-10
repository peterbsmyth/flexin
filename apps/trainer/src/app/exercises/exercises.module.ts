import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodComponentsModule } from '@bod/components';
import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { CreatePage } from './pages/create/create.page';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromExercises from './+state/exercises.reducer';
import { ExercisesEffects } from './+state/exercises.effects';
import { HomePage } from './pages/home/home.page';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [ExerciseFormComponent, CreatePage, HomePage, ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExercisesRoutingModule,
    BodComponentsModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule,
    StoreModule.forFeature(
      fromExercises.EXERCISES_FEATURE_KEY,
      fromExercises.reducer
    ),
    EffectsModule.forFeature([ExercisesEffects]),
  ],
})
export class ExercisesModule {}
