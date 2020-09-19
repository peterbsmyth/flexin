import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionItemPage } from './pages/session-item/session-item.page';
import { SessionItemExistsGuard } from './session-item-exists.guard';

const routes: Routes = [
  {
    path: 'session-items/:sessionItemId',
    component: SessionItemPage,
    canActivate: [SessionItemExistsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionItemsRoutingModule { }
