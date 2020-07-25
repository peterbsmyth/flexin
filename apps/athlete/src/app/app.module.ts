import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { InputPageComponent } from './input-page/input-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from '@bod/services';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProgramsPage } from './pages/programs/programs.page';
import { ProgramPage } from './pages/program/program.page';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StateModule } from '@bod/state';
import { WeekPage } from './pages/week/week.page';
import { MaximumAttemptPage } from './pages/maximum-attempt/maximum-attempt.page';
import { MaximumAttemptCardComponent } from './maximum-attempt-card/maximum-attempt-card.component';

@NgModule({
  declarations: [
    AppComponent,
    InputPageComponent,
    ActionBarComponent,
    SidenavComponent,
    ProgramsPage,
    ProgramPage,
    WeekPage,
    MaximumAttemptPage,
    MaximumAttemptCardComponent,
  ],
  imports: [
  BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'maximum-attempt',
          component: MaximumAttemptPage,
        },
        {
          path: 'programs',
          component: ProgramsPage,
        },
        {
          path: 'programs/:programId',
          component: ProgramPage,
        },
        {
          path: 'weeks/:weekId',
          component: WeekPage
        },
        {
          path: 'session',
          component: InputPageComponent,
        },
        {
          path: '',
          component: InputPageComponent,
        },
      ],
      { initialNavigation: 'enabled' }
    ),
    ServicesModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    StateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
