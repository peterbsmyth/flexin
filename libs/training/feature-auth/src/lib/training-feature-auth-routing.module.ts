import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './pages/auth.page';

const routes: Routes = [
  { path: 'auth/account/:jwt', component: AuthPage },
  { path: 'auth/account', component: AuthPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingFeatureAuthRoutingModule {}
