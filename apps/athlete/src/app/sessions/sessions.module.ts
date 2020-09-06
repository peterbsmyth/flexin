import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatListModule } from '@angular/material/list';
import { SessionsPage } from './pages/sessions/sessions.page';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSessions from './+state/sessions.reducer';
import { SessionsEffects } from './+state/sessions.effects';
import { SessionPage } from './pages/session/session.page';

@NgModule({
  declarations: [
    ActionBarComponent,
    MaximumAttemptPage,
    MaximumAttemptCardComponent,
    MaximumAttemptFormComponent,
    SessionsPage,
    SessionPage,
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
    MatListModule,
    StoreModule.forFeature(
      fromSessions.SESSIONS_FEATURE_KEY,
      fromSessions.reducer
    ),
    EffectsModule.forFeature([SessionsEffects]),
  ],
})
export class SessionsModule {}
