import { User } from './user.models';

export interface ExerciseV2 {
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
  exercise: ExerciseV2;
  order: number;
  name: string;
  createdBy: User;
}

export interface DemonstrationVideo {
  id: number;
  type: string; // instagram or youtube
  url: string;
}

export interface ProgramV2 {
  id?: number;
  number: number;
  workouts: Workout[];
  workoutStatistics: WorkoutStatistic[];
  createdBy: User;
  assignedTo: User;
}

export interface Workout {
  id: number;
  program: ProgramV2;
  exercise: ExerciseV2;
  workoutStatistic: WorkoutStatistic;
  week: number;
  day: number;
  order: number;
  reps: number; // 8
  amrap: boolean; // true
  setCount: number; // 3
  sets?: Set[];
  weight: number; // 10
  weightUnit: string; // 'lbs' or 'kg'
  intensity: string; // 'tuck to straddle'
  tempo: string; // '5s eccentric, 2s hold at bottom'
  notes: string; // 'squeeze at top'
  playlistUrl: string;
}

export interface WorkoutStatistic {
  id: number;
  program: ProgramV2;
  workout: Workout;
  setStatistics: SetStatisticV2[];
  rpe: number; // 8
  notes: string; // 'not at my full strength'
}

export interface SetStatisticV2 {
  id: number;
  set: number; // 1
  reps: number; // 8
  weight: number; // 35
  workoutStatistic: WorkoutStatistic;
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
