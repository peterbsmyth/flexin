import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ActionsBarComponent } from './actions-bar/actions-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
  CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [ButtonComponent, ActionsBarComponent],
  exports: [ButtonComponent, ActionsBarComponent]
})
export class BodComponentsModule {}
