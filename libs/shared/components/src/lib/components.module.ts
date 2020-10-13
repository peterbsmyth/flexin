import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ActionsBarComponent } from './components/actions-bar/actions-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from './components/footer/footer.component';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  declarations: [
    ButtonComponent,
    ActionsBarComponent,
    FooterComponent,
    ExerciseCardComponent,
    BreadcrumbsComponent,
  ],
  exports: [
    ButtonComponent,
    ActionsBarComponent,
    FooterComponent,
    ExerciseCardComponent,
    BreadcrumbsComponent,
  ],
})
export class BodComponentsModule {}
