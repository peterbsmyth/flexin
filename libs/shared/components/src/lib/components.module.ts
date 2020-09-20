import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ActionsBarComponent } from './components/actions-bar/actions-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from './components/footer/footer.component';
import { BoardCardComponent } from './components/board-card/board-card.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  declarations: [
    ButtonComponent,
    ActionsBarComponent,
    FooterComponent,
    BoardCardComponent,
  ],
  exports: [
    ButtonComponent,
    ActionsBarComponent,
    FooterComponent,
    BoardCardComponent,
  ],
})
export class BodComponentsModule {}
