import { Program, Session, SessionItem, Week } from './primary-models';

export interface SessionItemStatistic {
  id?: number;
  sessionItemId?: number;
  sessionItem?: SessionItem;
  sessionStatisticId?: number;
  sessionStatistic?: SessionStatistic;
  setStatistics?: SetStatistic[];
  rpe: number;
  notes: string;
}

export interface SetStatistic {
  id?: number;
  set: number;
  reps: number;
  weight: number;
  sessionItemStatisticId?: number;
}

export interface SessionStatistic {
  id?: number;
  sessionId: number;
  session?: Session;
  weekStatisticId: number;
  sessionItemStatistics?: SessionItemStatistic[];
}

export interface WeekStatistic {
  id?: number;
  weekId: number;
  programStatisticId?: number;
  week?: Week;
  programStatistic?: ProgramStatistic;
  sessionStatistics?: SessionStatistic[];
  playlist?: string;
}

export interface ProgramStatistic {
  id?: number;
  programId: number;
  program?: Program;
  weekStatistics?: WeekStatistic[];
}

export interface MaxAttemptItem {
  id?: number;
  exercise: number;
  reps: number;
  bestAttempt: boolean;
  leftRight?: boolean;
  weight: number;
  intensity: string;
}
