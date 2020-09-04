import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaximumAttemptPage } from './pages/maximum-attempt/maximum-attempt.page';
import { InputPage } from './pages/input/input.page';

const routes: Routes = [
  {
    path: 'maximum-attempt',
    component: MaximumAttemptPage,
  },
  {
    path: 'session',
    component: InputPage,
  },
  {
    path: '',
    component: InputPage,
  },
  { path: 'programs', loadChildren: () => import('./programs/programs.module').then(m => m.ProgramsModule) },
  { path: 'weeks', loadChildren: () => import('./weeks/weeks.module').then(m => m.WeeksModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { } 