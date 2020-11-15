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
  categories: [
    {
      id: 1,
      name: 'Pull',
      createdBy: {
        id: 1,
        name: 'calisthenics',
        role: 'coach',
        instagramUsername: 'calisthenics',
      },
    },
  ],
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

export const mockExercises: ExerciseV2[] = [
  mockExercise,
  {
    id: 2,
    name: 'Pull Up',
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
    categories: [
      {
        id: 1,
        name: 'Pull',
        createdBy: {
          id: 1,
          name: 'calisthenics',
          role: 'coach',
          instagramUsername: 'calisthenics',
        },
      },
    ],
    leftRight: false,
    measuredBy: 'reps',
    demonstrationVideos: [],
    createdBy: {
      id: 1,
      name: 'calisthenics',
      role: 'coach',
      instagramUsername: 'calisthenics',
    },
  },
];

export const setStatisticsForWorkoutOne = [
  {
    id: 1,
    set: 1,
    reps: 8,
    weight: 25,
    workoutId: 1,
    programId: 1,
  },
  {
    id: 2,
    set: 2,
    reps: 8,
    weight: 25,
    workoutId: 1,
    programId: 1,
  },
];

export const setStatisticsForWorkoutTwo = [
  {
    id: 3,
    set: 1,
    reps: 15,
    workoutId: 1,
    programId: 1,
  },
  {
    id: 4,
    set: 2,
    reps: 8,
    workoutId: 1,
    programId: 1,
  },
];

export const mockWorkouts: Workout[] = [
  {
    id: 1,
    programId: 1,
    exerciseId: 1,
    exercise: mockExercise,
    week: 1,
    day: 1,
    order: 1,
    reps: 10,
    amrap: false,
    setCount: 3,
    weight: 10,
    weightUnit: 'lbs',
    intensityId: 1,
    intensity: mockExercise.intensities[0],
    tempo: '2012',
    notes: 'go hard',
    rpe: 1,
    athleteNotes: '',
    setStatistics: setStatisticsForWorkoutOne,
  },
  {
    id: 2,
    programId: 1,
    exerciseId: 2,
    exercise: mockExercises[1],
    week: 2,
    day: 1,
    order: 1,
    reps: 10,
    amrap: false,
    setCount: 3,
    weight: null,
    weightUnit: 'lbs',
    intensityId: 1,
    intensity: mockExercise.intensities[0],
    tempo: '2012',
    notes: 'go hard',
    setStatistics: setStatisticsForWorkoutTwo,
  },
  {
    id: 3,
    programId: 1,
    exerciseId: 2,
    exercise: mockExercises[1],
    week: 1,
    day: 2,
    order: 1,
    reps: 10,
    amrap: false,
    setCount: 3,
    weight: 10,
    weightUnit: 'lbs',
    intensityId: 1,
    intensity: mockExercise.intensities[0],
    tempo: '2012',
    notes: 'go hard',
    setStatistics: [],
  },
  {
    id: 4,
    programId: 1,
    exerciseId: 2,
    exercise: mockExercises[1],
    week: 1,
    day: 1,
    order: 2,
    reps: 10,
    amrap: false,
    setCount: 3,
    weight: 10,
    weightUnit: 'lbs',
    intensityId: 1,
    intensity: mockExercise.intensities[0],
    tempo: '2012',
    notes: 'go hard',
    setStatistics: [],
  },
];

export const mockPrograms: ProgramV2[] = [
  {
    id: 1,
    number: 1,
    workouts: mockWorkouts,
    setStatistics: [
      ...setStatisticsForWorkoutOne,
      ...setStatisticsForWorkoutTwo,
    ],
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
    playlist: {
      id: 1,
      url: 'PLu0SKb668nMemkZ7wQWhtbBauKbNJ9cD-',
    },
  },
  {
    id: 2,
    number: 2,
    workouts: mockWorkouts.slice(-1),
    setStatistics: [],
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
    playlist: {
      id: 1,
      url: 'PLu0SKb668nMemkZ7wQWhtbBauKbNJ9cD-',
    },
  },
];
