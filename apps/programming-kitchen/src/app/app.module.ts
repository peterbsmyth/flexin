import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { ExerciseComponent } from './exercise/exercise.component';

@NgModule({
  declarations: [AppComponent, ExerciseComponent],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
