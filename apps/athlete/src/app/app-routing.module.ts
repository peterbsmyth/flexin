import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaximumAttemptPage } from './pages/maximum-attempt/maximum-attempt.page';
import { ProgramsPage } from './pages/programs/programs.page';
import { ProgramPage } from './pages/program/program.page';
import { WeekPage } from './pages/week/week.page';
import { InputPageComponent } from './input-page/input-page.component';

const routes: Routes = [
  {
    path: 'maximum-attempt',
    component: MaximumAttemptPage,
  },
  {
    path: 'programs',
    component: ProgramsPage,
  },
  {
    path: 'programs/:programId',
    component: ProgramPage,
  },
  {
    path: 'weeks/:weekId',
    component: WeekPage
  },
  {
    path: 'session',
    component: InputPageComponent,
  },
  {
    path: '',
    component: InputPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { } 