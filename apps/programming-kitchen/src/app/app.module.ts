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
import { SessionGridComponent } from './session-grid/session-grid.component';
import { SessionItemComponent } from './session-item/session-item.component';
import { SessionComponent } from './session/session.component';
import { NewSessionItemComponent } from './new-session-item/new-session-item.component';
import { NewSessionGridComponent } from './new-session-grid/new-session-grid.component';
import { NewSessionComponent } from './new-session/new-session.component';
import { SessionConfigurationBoardComponent } from './session-configuration-board/session-configuration-board.component';

@NgModule({
  declarations: [AppComponent, ExerciseComponent, ProgramBoardComponent, NavComponent, ExerciseFormComponent, SessionGridComponent, SessionItemComponent, SessionComponent, NewSessionItemComponent, NewSessionGridComponent, NewSessionComponent, SessionConfigurationBoardComponent],
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
