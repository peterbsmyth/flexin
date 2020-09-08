import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppPage } from './core/pages/app/app.page';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, DefaultRouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@bod/shared/environments';
import { CoachingDomainModule } from '@bod/coaching/domain';
import { ProgramsModule } from './programs/programs.module';

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
    StoreRouterConnectingModule.forRoot({ serializer: DefaultRouterStateSerializer }),
    AppRoutingModule,
    BrowserAnimationsModule,
    CoachingDomainModule,
    CoreModule,
    ProgramsModule
  ],
  providers: [],
  bootstrap: [AppPage],
})
export class AppModule {}
