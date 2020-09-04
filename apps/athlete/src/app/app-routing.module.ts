import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaximumAttemptPage } from './pages/maximum-attempt/maximum-attempt.page';
import { InputPageComponent } from './input-page/input-page.component';

const routes: Routes = [
  {
    path: 'maximum-attempt',
    component: MaximumAttemptPage,
  },
  {
    path: 'session',
    component: InputPageComponent,
  },
  {
    path: '',
    component: InputPageComponent,
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