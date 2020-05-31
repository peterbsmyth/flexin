import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ProgramBoardComponent } from './program-board/program-board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, ExerciseComponent, ProgramBoardComponent, NavComponent, ExerciseFormComponent],
  imports: [
    BrowserModule,
    DragDropModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
