import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NetworkStatusModule } from '@bod/shared/domain';
import { environment } from '@bod/shared/environments';
import { TrainingFeatureAuthModule } from '@bod/training/feature-auth';
import { TrainingFeatureManageCategoriesModule } from '@bod/training/feature-manage-categories';
import { TrainingFeatureManageExercisesModule } from '@bod/training/feature-manage-exercises';
import { TrainingFeatureManageMealPlansModule } from '@bod/training/feature-manage-meal-plans';
import { TrainingFeatureManageProgramsModule } from '@bod/training/feature-manage-programs';
import { TrainingFeatureManageWorkoutsModule } from '@bod/training/feature-manage-workouts';
import { EffectsModule } from '@ngrx/effects';
import {
  DefaultRouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppPage } from './core/pages/app/app.page';

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
    TrainingFeatureAuthModule,
    TrainingFeatureManageProgramsModule,
    TrainingFeatureManageExercisesModule,
    TrainingFeatureManageWorkoutsModule,
    TrainingFeatureManageMealPlansModule,
    TrainingFeatureManageCategoriesModule,
  ],
  bootstrap: [AppPage],
  exports: [],
})
export class AppModule {}
