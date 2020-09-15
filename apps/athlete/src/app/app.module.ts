import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@bod/shared/environments';
import {
  StoreRouterConnectingModule,
  DefaultRouterStateSerializer,
} from '@ngrx/router-store';
import { TrainingFeatureInputWorkoutModule } from '@bod/training/feature-input-workout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BusyHttpInterceptor, BusyService } from '@bod/shared/domain';

@NgModule({
  declarations: [AppComponent, SidenavComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserModule,
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
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
    }),
    TrainingFeatureInputWorkoutModule,
    HttpClientModule,
  ],
  providers: [
    BusyService,
    { provide: HTTP_INTERCEPTORS, useClass: BusyHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
