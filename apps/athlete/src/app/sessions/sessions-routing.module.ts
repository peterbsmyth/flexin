import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputPage } from './pages/input/input.page';
import { MaximumAttemptPage } from './pages/maximum-attempt/maximum-attempt.page';
import { SessionsPage } from './pages/sessions/sessions.page';

const routes: Routes = [
  {
    path: '',
    component: SessionsPage
  },
  {
  path: 'create',
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
