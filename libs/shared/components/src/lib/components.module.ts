import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActionsBarComponent } from './components/actions-bar/actions-bar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import {
  CardComponent,
  CardContentDirective,
  CardHeaderDirective,
} from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatCardModule],
  declarations: [
    ActionsBarComponent,
    FooterComponent,
    BreadcrumbsComponent,
    CardComponent,
    CardHeaderDirective,
    CardContentDirective,
    PageLayoutComponent,
  ],
  exports: [
    ActionsBarComponent,
    FooterComponent,
    BreadcrumbsComponent,
    CardComponent,
    CardHeaderDirective,
    CardContentDirective,
    PageLayoutComponent,
  ],
})
export class BodComponentsModule {}
