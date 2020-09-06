import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeekPage } from './pages/week/week.page';

const routes: Routes = [
  {
    path: 'weeks/:weekId',
    component: WeekPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeeksRoutingModule { }
