import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { InputPageComponent } from './input-page/input-page.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AppComponent, InputPageComponent],
  imports: [
    MatCardModule,
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: InputPageComponent,
        },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
