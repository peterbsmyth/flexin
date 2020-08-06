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
import { SessionConfigurationBoardComponent } from './session-configuration-board/session-configuration-board.component';
import { ButtonComponent } from './button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ActionsBarComponent } from './actions-bar/actions-bar.component';
import { BoardComponent } from './board/board.component';
import { ServicesModule } from '@bod/services';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [AppComponent, ExerciseComponent, ProgramBoardComponent, NavComponent, ExerciseFormComponent, SessionGridComponent, SessionItemComponent, SessionComponent, SessionConfigurationBoardComponent, ButtonComponent, ActionsBarComponent, BoardComponent],
  imports: [
    BrowserModule,
    DragDropModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ServicesModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
