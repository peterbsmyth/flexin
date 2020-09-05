import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPage } from './pages/input/input.page';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { MaximumAttemptPage } from './pages/maximum-attempt/maximum-attempt.page';
import { MaximumAttemptCardComponent } from './components/maximum-attempt-card/maximum-attempt-card.component';
import { MaximumAttemptFormComponent } from './components/maximum-attempt-form/maximum-attempt-form.component';
import { SessionsRoutingModule } from './sessions-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    InputPage,
    ActionBarComponent,
    MaximumAttemptPage,
    MaximumAttemptCardComponent,
    MaximumAttemptFormComponent,
  ],
  imports: [
    CommonModule,
    SessionsRoutingModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class SessionsModule {}
