import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseExistsGuard } from './guards/exercise-exists.guard';
import { ExerciseCreatePage } from './pages/exercise-create/exercise-create.page';
import { ExercisePage } from './pages/exercise/exercise.page';
import { ExercisesPage } from './pages/exercises/exercises.page';

const routes: Routes = [
  { path: 'exercises', component: ExercisesPage },
  { path: 'exercises/create', component: ExerciseCreatePage },
  {
    path: 'exercises/:exerciseId',
    component: ExercisePage,
    canActivate: [ExerciseExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingFeatureManageExercisesRoutingModule {}
