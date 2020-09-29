import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsPage } from './pages/programs/programs.page';
import { ProgramPage } from './pages/program/program.page';
import { WeeksPage } from './pages/weeks/weeks.page';
import { ProgramExistsGuard } from './guards/program-exists.guard';
import { WeekPage } from './pages/week/week.page';
import { SessionsPage } from './pages/sessions/sessions.page';
import { WeekExistsGuard } from './guards/week-exists.guard';
import { MaximumAttemptPage } from './pages/maximum-attempt/maximum-attempt.page';
import { SessionPage } from './pages/session/session.page';
import { SessionItemPage } from './pages/session-item/session-item.page';
import { SessionExistsGuard } from './guards/session-exists.guard';
import { SessionItemExistsGuard } from './guards/session-item-exists.guard';

const routes: Routes = [
  {
    path: 'programs',
    component: ProgramsPage,
  },
  {
    path: 'programs/:programId',
    component: ProgramPage,
    canActivate: [ProgramExistsGuard],
    children: [
      {
        path: '',
        component: WeeksPage,
      },
    ],
  },
  {
    path: 'weeks/:weekId',
    component: WeekPage,
    canActivate: [WeekExistsGuard],
    children: [
      {
        path: '',
        component: SessionsPage,
      },
    ],
  },
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
export class TrainingFeatureInputWorkoutRoutingModule {}
