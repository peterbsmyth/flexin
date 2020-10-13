import { WeekStatistic } from './statistic-models';

export interface Exercise {
  id?: number;
  name: string;
  push?: boolean;
  pull?: boolean;
  intensities: string[];
  leftRight?: boolean;
}

export interface SessionItem {
  id?: number;
  exerciseId?: number;
  sessionId?: number;
  reps: number;
  AMRAP: boolean;
  leftRight?: boolean;
  sets: number;
  weight: number;
  weightUnit: string;
  intensity: string;
  tempo: string;
  order?: number;
  exercise?: Exercise;
}

export interface Session {
  id?: number;
  weekId?: number;
  name: string;
  order: number;
}

export interface Week {
  id?: number;
  programId?: number;
  weekStatisticId: number;
  weekStatistic?: WeekStatistic;
  number: number;
}

export interface Program {
  id?: number;
  name: string;
}
