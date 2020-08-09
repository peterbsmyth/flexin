import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodComponentsModule } from '@bod/components';
import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramBoardComponent } from './components/program-board/program-board.component';
import { ActionsBarComponent } from './components/actions-bar/actions-bar.component';
import { BoardComponent } from './components/board/board.component';
import { SessionGridComponent } from './components/session-grid/session-grid.component';
import { SessionItemComponent } from './components/session-item/session-item.component';
import { SessionComponent } from './components/session/session.component';
import { SessionConfigurationBoardComponent } from './components/session-configuration-board/session-configuration-board.component';
import { CreatePage } from './pages/create/create.page';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ProgramBoardComponent,
    BoardComponent,
    ActionsBarComponent,
    SessionGridComponent,
    SessionItemComponent,
    SessionComponent,
    SessionConfigurationBoardComponent,
    ExerciseComponent,
    CreatePage
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProgramsRoutingModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    BodComponentsModule
  ]
})
export class ProgramsModule { }
