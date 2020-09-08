import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/programs',
    pathMatch: 'full'
  },
  { path: 'exercises', loadChildren: () => import('./exercises/exercises.module').then(m => m.ExercisesModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { } 