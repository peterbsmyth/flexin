import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ProgramBoardComponent } from './program-board/program-board.component';

@NgModule({
  declarations: [AppComponent, ExerciseComponent, ProgramBoardComponent],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
