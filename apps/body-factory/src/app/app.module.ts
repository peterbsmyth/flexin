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
import { NavComponent } from './nav/nav.component';
import { ActionBarComponent } from './action-bar/action-bar.component';


@NgModule({
  declarations: [AppComponent, InputPageComponent, NavComponent, ActionBarComponent],
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
          path: '',
          component: InputPageComponent,
        },
      ],
      { initialNavigation: 'enabled' }
    ),
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
