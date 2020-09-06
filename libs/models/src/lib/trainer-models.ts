export interface Exercise {
  id?: number;
  name: string; // tuck planche hold
  push?: boolean; // true
  pull?: boolean; // false
  intensities: string[];
  leftRight?: boolean;
}

export interface SessionItem {
  id?: number;
  exercise: Exercise;
  reps: number; // 8
  AMRAP: boolean; // true
  leftRight?: boolean; // false
  sets: number; // 3
  weight: string; // '10 kilos', '25 lbs'
  intensity: string; // 'tuck to straddle'
  tempo: string; // '5s eccentric, 2s hold at bottom'
}

export interface Session {
  id?: number;
  name: string; // 'PULL A'
  items: SessionItem[];
  order: number; // 1 (refers to placement with in a Week)
}

export interface Week {
  id?: number;
  number: number; // 6
  sessions: number[];
}

export interface Program {
  id?: number;
  name: string; // 'Program 1'
  weeks: Week[];
}