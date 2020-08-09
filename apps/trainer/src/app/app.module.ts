import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppPage } from './core/pages/app/app.page';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesModule } from '@bod/services';

import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServicesModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppPage],
})
export class AppModule {}
