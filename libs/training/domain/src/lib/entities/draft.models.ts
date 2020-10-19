import { Exercise, SessionItem, Session, Week } from '@bod/shared/models';
import { Dictionary } from '@ngrx/entity';

export interface DraftProgram {
  exercises?: Dictionary<Exercise>;
  sessionItems?: Dictionary<SessionItem>;
  sessions?: Dictionary<Session>;
  weeks?: Dictionary<Week>;
  name?: string;
}
