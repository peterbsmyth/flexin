import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionItemPage } from './pages/session-item/session-item.page';
import { SessionItemsRoutingModule } from './session-items-routing.module';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SessionItemFormComponent } from './components/session-item-form/session-item-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BodComponentsModule } from '@bod/shared/components';

@NgModule({
  declarations: [SessionItemPage, SessionItemFormComponent],
  imports: [
    CommonModule,
    SessionItemsRoutingModule,
    ReactiveComponentModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    BodComponentsModule,
  ],
})
export class SessionItemsModule {}
