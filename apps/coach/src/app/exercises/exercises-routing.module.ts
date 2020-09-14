import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePage } from './pages/create/create.page';
import { ExercisesPage } from './pages/exercises/exercises.page';

const routes: Routes = [
  { path: '', component: ExercisesPage },
  { path: 'create', component: CreatePage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }
