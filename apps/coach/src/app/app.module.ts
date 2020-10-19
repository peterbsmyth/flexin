import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppPage } from './core/pages/app/app.page';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  DefaultRouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@bod/shared/environments';
import { CoachingFeatureCreateProgramModule } from '@bod/training/feature-create-program';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
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
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    CoachingFeatureCreateProgramModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppPage],
})
export class AppModule {}
