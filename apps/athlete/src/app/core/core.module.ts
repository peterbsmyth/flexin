import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppPage } from './pages/app/app.page';
import { NavComponent } from './components/nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NetworkStatusModule } from '@bod/shared/domain';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BodComponentsModule } from '@bod/shared/components';
import { HomeComponent } from './components/home/home.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [AppPage, NavComponent, HomeComponent],
  imports: [
    BodComponentsModule,
    MatSnackBarModule,
    CommonModule,
    NetworkStatusModule.forRoot(),
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [AppPage],
})
export class CoreModule {}
