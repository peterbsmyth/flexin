import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodComponentsModule } from '@bod/shared/components';
import { ProgramsRoutingModule } from './programs-routing.module';
import { BoardComponent } from './components/board/board.component';
import { CreatePage } from './pages/create/create.page';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { SessionComponent } from './components/session/session.component';
import { SessionItemComponent } from './components/session-item/session-item.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CoachingDomainModule } from '@bod/coaching/domain';
import { HomePage } from './pages/home/home.page';
import { MatListModule } from '@angular/material/list';
import { ProgramPage } from './pages/program/program.page';
import { ProgramBoardPage } from './pages/program-board/program-board.page';
import { SessionConfigurationBoardPage } from './pages/session-configuration-board/session-configuration-board.page';
import { SessionGridPage } from './pages/session-grid/session-grid.page';

@NgModule({
  declarations: [
    BoardComponent,
    ExerciseComponent,
    SessionItemComponent,
    SessionComponent,
    CreatePage,
    HomePage,
    ProgramPage,
    ProgramBoardPage,
    SessionConfigurationBoardPage,
    SessionGridPage,
  ],
  imports: [
    CommonModule,
    CoachingDomainModule,
    ReactiveFormsModule,
    ProgramsRoutingModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    BodComponentsModule,
  ],
})
export class ProgramsModule {}
