import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@bod/shared/environments';
import {
  StoreRouterConnectingModule,
  DefaultRouterStateSerializer,
} from '@ngrx/router-store';
import { TrainingFeatureInputWorkoutModule } from '@bod/training/feature-input-workout';
import { HttpClientModule } from '@angular/common/http';
import { NetworkStatusModule } from '@bod/shared/domain';
import { TrainingFeatureReviewStatisticsModule } from '@bod/training/feature-review-statistics';
import { AppPage } from './core/pages/app/app.page';
import { CoachingFeatureCreateProgramModule } from '@bod/training/feature-create-program';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    BrowserModule,
    LayoutModule,
    NetworkStatusModule.forRoot(),
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
    TrainingFeatureReviewStatisticsModule,
    CoachingFeatureCreateProgramModule,
  ],
  bootstrap: [AppPage],
  exports: [],
})
export class AppModule {}
