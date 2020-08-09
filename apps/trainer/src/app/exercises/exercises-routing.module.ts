import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePage } from './pages/create/create.page';

const routes: Routes = [{ path: '', component: CreatePage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }
