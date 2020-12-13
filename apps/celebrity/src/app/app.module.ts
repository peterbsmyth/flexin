import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CelebritiesFeatureDisplayTopTenModule } from '@bod/celebrities/feature-display-top-ten';
import { HttpClientModule } from '@angular/common/http';
import { BodComponentsModule } from '@bod/shared/components';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BodComponentsModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' }),
    CelebritiesFeatureDisplayTopTenModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
