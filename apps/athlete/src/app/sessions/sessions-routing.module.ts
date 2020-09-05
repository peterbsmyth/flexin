import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputPage } from './pages/input/input.page';
import { MaximumAttemptPage } from './pages/maximum-attempt/maximum-attempt.page';

const routes: Routes = [
  {
    path: '',
    component: InputPage,
  },
  {
    path: 'maximum-attempt',
    component: MaximumAttemptPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsRoutingModule {}
