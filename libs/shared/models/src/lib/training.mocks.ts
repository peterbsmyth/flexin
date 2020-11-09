import { ExerciseV2, ProgramV2, Workout } from './training.models';

export const mockExercise: ExerciseV2 = {
  id: 1,
  name: 'Chin Up',
  intensities: [
    {
      id: 1,
      name: 'Full',
      order: 2,
      createdBy: {
        id: 1,
        name: 'calisthenics',
        role: 'coach',
        instagramUsername: 'calisthenics',
      },
    },
  ],
  categories: [],
  leftRight: false,
  measuredBy: 'reps',
  demonstrationVideos: [],
  createdBy: {
    id: 1,
    name: 'calisthenics',
    role: 'coach',
    instagramUsername: 'calisthenics',
  },
};

export const mockWorkouts: Workout[] = [
  {
    id: 1,
    programId: 1,
    exerciseId: 1,
    exercise: mockExercise,
    workoutStatistic: {
      id: 1,
      programId: 1,
      workoutId: 1,
      rpe: null,
      notes: '',
      setStatistics: [],
    },
    week: 1,
    day: 1,
    order: 1,
    reps: 10,
    amrap: false,
    setCount: 3,
    weight: 10,
    weightUnit: 'lbs',
    intensityId: 1,
    tempo: '2012',
    notes: 'go hard',
  },
  {
    id: 2,
    programId: 1,
    exerciseId: 1,
    workoutStatistic: {
      id: 2,
      programId: 1,
      workoutId: 2,
      rpe: null,
      notes: '',
      setStatistics: [],
    },
    week: 2,
    day: 1,
    order: 1,
    reps: 10,
    amrap: false,
    setCount: 3,
    weight: 10,
    weightUnit: 'lbs',
    intensityId: 1,
    tempo: '2012',
    notes: 'go hard',
  },
];

export const mockPrograms: ProgramV2[] = [
  {
    id: 1,
    number: 1,
    workouts: mockWorkouts,
    workoutStatistics: [],
    createdBy: {
      id: 1,
      name: 'calisthenics',
      role: 'coach',
      instagramUsername: 'calisthenics',
    },
    assignedTo: {
      id: 2,
      name: 'peter b smith',
      role: 'athlete',
      instagramUsername: 'peterbsmyth',
    },
  },
];
