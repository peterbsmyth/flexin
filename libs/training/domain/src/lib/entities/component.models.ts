import { Exercise, Workout } from '@bod/shared/models';

export interface WorkoutFormData {
  workout: Workout;
  exercises: Exercise[];
}

export interface BoardCardData {
  id?: number;
  name: string;
  category?: string;
}
