import { User } from './user.models';

export interface Exercise {
  id?: number;
  name: string; // tuck planche hold
  categories: Category[];
  intensities: Intensity[];
  leftRight: boolean;
  measuredBy: string; // either 'secs' or 'reps' as the unit for measuring duration or quantity measurement
  demonstrationVideos: DemonstrationVideo[];
  createdBy: User;
}

export interface Intensity {
  id: number;
  exerciseId?: number;
  exercise?: Exercise;
  order: number;
  name: string;
  createdBy: User;
}

export interface DemonstrationVideo {
  id: number;
  type: string; // instagram or youtube
  url: string;
}

export interface Program {
  id?: number;
  number: number;
  workouts?: Workout[];
  setStatistics?: SetStatistic[];
  playlist?: Playlist;
  createdBy?: User;
  assignedTo?: User;
}

export interface Workout {
  id: number;
  programId: number;
  program?: Program;
  exerciseId: number;
  exercise?: Exercise;
  week: number;
  day: number;
  order: number;
  reps: number; // 8
  amrap: boolean; // true
  setCount: number; // 3
  sets?: Set[];
  weight: number; // 10
  weightUnit: string; // 'lbs' or 'kg'
  intensityId: number;
  intensity?: Intensity;
  tempo: string; // '5s eccentric, 2s hold at bottom'
  notes: string; // 'squeeze at top'
  playlistUrl?: string;
  rpe?: number; // 8
  athleteNotes?: string; // 'not at my full strength'
  setStatistics: SetStatistic[];
}

export interface SetStatistic {
  id: number;
  set: number; // 1
  reps: number; // 8
  weight?: number; // 35
  workoutId?: number;
  workout?: Workout;
  programId?: number;
  program?: Program;
}

export interface Set {
  id: number;
  order: number;
  notes: string;
  weight: number;
  reps: number;
}

export interface Category {
  id: number;
  name: string;
  createdBy: User;
}

export interface Playlist {
  id: number;
  url: string;
  week?: number;
  programId?: number;
  program?: Program;
}
