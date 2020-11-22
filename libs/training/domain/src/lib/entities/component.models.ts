import { Workout, ExerciseV2 } from '@bod/shared/models';

export interface WorkoutFormData {
  workout: Workout;
  exercises: ExerciseV2[];
}

export interface BoardCardData {
  id?: number;
  name: string;
  category?: string;
  routerLink?: string;
}
