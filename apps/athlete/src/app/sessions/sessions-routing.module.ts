import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaximumAttemptPage } from './pages/maximum-attempt/maximum-attempt.page';
import { SessionsPage } from './pages/sessions/sessions.page';
import { SessionPage } from './pages/session/session.page';

const routes: Routes = [
  {
    path: 'sessions',
    component: SessionsPage,
  },
  {
    path: 'sessions/maximum-attempt',
    component: MaximumAttemptPage,
  },
  {
    path: 'sessions/:sessionId',
    component: SessionPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsRoutingModule {}
