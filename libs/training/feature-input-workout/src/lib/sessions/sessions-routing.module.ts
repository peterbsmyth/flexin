import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaximumAttemptPage } from './pages/maximum-attempt/maximum-attempt.page';
import { SessionPage } from './pages/session/session.page';
import { SessionItemPage } from './pages/session-item/session-item.page';
import { SessionExistsGuard } from './session-exists.guard';
import { SessionItemExistsGuard } from './session-item-exists.guard';

const routes: Routes = [
  {
    path: 'sessions/maximum-attempt',
    component: MaximumAttemptPage,
  },
  {
    path: 'sessions/:sessionId',
    component: SessionPage,
    children: [
      {
        path: 'items/:sessionItemId',
        component: SessionItemPage,
        canActivate: [SessionItemExistsGuard],
      },
    ],
    canActivate: [SessionExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsRoutingModule {}
