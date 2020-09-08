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
  exerciseId: number;
  sessionId: number;
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
  weekId: number;
  name: string; // 'PULL A'
  order: number; // 1 (refers to placement with in a Week)
  sessionItems?: SessionItem[];
}

export interface Week {
  id?: number;
  programId: number;
  number: number; // 6
  sessions?: Session[];
}

export interface Program {
  id?: number;
  name: string; // 'Program 1'
  weeks?: Week[];
}