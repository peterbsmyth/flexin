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
import { HttpClientModule } from '@angular/common/http';
import { NetworkStatusModule } from '@bod/shared/domain';
import { TrainingFeatureReviewStatisticsModule } from '@bod/training/feature-review-statistics';
import { AppPage } from './core/pages/app/app.page';
import { CoreModule } from './core/core.module';
import { TrainingFeatureAuthModule } from '@bod/training/feature-auth';
import { TrainingFeatureManageProgramsModule } from '@bod/training/feature-manage-programs';
import { TrainingFeatureManageExercisesModule } from '@bod/training/feature-manage-exercises';
import { TrainingFeatureManageWorkoutsModule } from '@bod/training/feature-manage-workouts';
import { TrainingFeatureManageMealPlansModule } from '@bod/training/feature-manage-meal-plans';

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
          strictActionSerializability: true,
          strictActionTypeUniqueness: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
    }),
    HttpClientModule,
    TrainingFeatureReviewStatisticsModule,
    TrainingFeatureAuthModule,
    TrainingFeatureManageProgramsModule,
    TrainingFeatureManageExercisesModule,
    TrainingFeatureManageWorkoutsModule,
    TrainingFeatureManageMealPlansModule,
  ],
  bootstrap: [AppPage],
  exports: [],
})
export class AppModule {}
