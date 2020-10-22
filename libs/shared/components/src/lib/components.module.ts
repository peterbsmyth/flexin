import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsBarComponent } from './components/actions-bar/actions-bar.component';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import {
  CardComponent,
  CardHeader,
  CardContent,
} from './components/card/card.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatCardModule],
  declarations: [
    ActionsBarComponent,
    FooterComponent,
    BreadcrumbsComponent,
    CardComponent,
    CardHeader,
    CardContent,
  ],
  exports: [
    ActionsBarComponent,
    FooterComponent,
    BreadcrumbsComponent,
    CardComponent,
    CardHeader,
    CardContent,
  ],
})
export class BodComponentsModule {}
