import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeekPage } from './pages/week/week.page';
import { SessionsPage } from './pages/sessions/sessions.page';
import { WeekExistsGuard } from './week-exists.guard';

const routes: Routes = [
  {
    path: 'weeks/:weekId',
    component: WeekPage,
    canActivate: [WeekExistsGuard],
    children: [{
      path: '',
      component: SessionsPage
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class WeeksRoutingModule { }
