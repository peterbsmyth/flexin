import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePage } from './pages/create/create.page';
import { HomePage } from './pages/home/home.page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'create', component: CreatePage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }
