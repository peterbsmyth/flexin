import { Exercise, Session, SessionItem, Week, Program } from './trainer-models';

export const mockExercises: Exercise[] = [
  {
    id: 1,
    name: 'Handstand push-up negative',
    intensities: ['bodyweight'],
    push: true,
  },
  {
    id: 2,
    name: 'Handstand to planche negative with hold',
    intensities: [
      'tuck',
      'advanced tuck',
      'single-leg',
      'closed straddle',
      'open straddle',
      'full',
    ],
    push: true,
  },
  {
    id: 3,
    name: 'Band planche',
    intensities: [
      'tuck',
      'advanced tuck',
      'single-leg',
      'closed straddle',
      'open straddle',
      'full',
    ],
    push: true,
  },
  {
    id: 4,
    name: 'Weighted dips',
    intensities: [],
    push: true,
  },
  {
    id: 5,
    name: 'OAC negatives',
    intensities: [],
    pull: true,
  },
  {
    id: 6,
    name: 'Front lever raises top half',
    intensities: [
      'tuck',
      'advanced tuck',
      'single-leg',
      'closed straddle',
      'open straddle',
      'full',
    ],
    pull: true,
  },
  {
    id: 7,
    name: 'Weighted Chin-ups',
    intensities: [],
    pull: true,
  },
  {
    id: 8,
    name: 'Front lever holds with band',
    intensities: [
      'tuck',
      'advanced tuck',
      'single-leg',
      'closed straddle',
      'open straddle',
      'full',
    ],
    pull: true,
  },
  {
    id: 9,
    name: 'MAPPU',
    intensities: ['tuck => straddle', 'tuck => full', 'straddle => full'],
    push: true,
  },
  {
    id: 10,
    name: 'Pseudo planche push-ups with lift',
    intensities: ['straddle', 'full'],
    push: true,
  },
  {
    id: 11,
    name: 'L-sit chin-ups',
    intensities: [],
    pull: true,
  },
  {
    id: 12,
    name: 'Archer rows',
    intensities: [],
    pull: true,
  },
];

export const mockSessionItems: SessionItem[] = [
  {
    exercise: {
      id: 1,
      name: 'Handstand push-up negative',
      intensities: ['bodyweight'],
      push: true,
    },
    reps: 1,
    AMRAP: false,
    sets: 5,
    weight: null,
    intensity: null,
    tempo: '5s eccentric, 2s hold',
    id: 1001,
  },
  {
    exercise: {
      id: 2,
      name: 'Handstand to planche negative with hold',
      intensities: [
        'tuck',
        'advanced tuck',
        'single-leg',
        'closed straddle',
        'open straddle',
        'full',
      ],
      push: true,
    },
    reps: 1,
    AMRAP: false,
    sets: 5,
    weight: null,
    intensity: 'closed straddle',
    tempo: '5 second hold at bottom',
    id: 1002,
  },
  {
    exercise: {
      id: 3,
      name: 'Band planche',
      intensities: [
        'tuck',
        'advanced tuck',
        'single-leg',
        'closed straddle',
        'open straddle',
        'full',
      ],
      push: true,
    },
    reps: 20,
    AMRAP: false,
    sets: 3,
    weight: null,
    intensity: 'full',
    tempo: null,
    id: 1003,
  },
  {
    exercise: { id: 4, name: 'Weighted dips', intensities: [], push: true },
    reps: 8,
    AMRAP: false,
    sets: 4,
    weight: '35',
    intensity: null,
    tempo: 'self directed',
    id: 1004,
  },
  {
    exercise: { id: 5, name: 'OAC negatives', intensities: [], pull: true },
    reps: 2,
    AMRAP: false,
    sets: 2,
    weight: null,
    intensity: null,
    tempo: '5 second eccentric',
    id: 1005,
  },
  {
    exercise: {
      id: 6,
      name: 'Front lever raises top half',
      intensities: [
        'tuck',
        'advanced tuck',
        'single-leg',
        'closed straddle',
        'open straddle',
        'full',
      ],
      pull: true,
    },
    reps: 3,
    AMRAP: false,
    sets: 4,
    weight: null,
    intensity: 'single-leg',
    tempo: 'self directed',
    id: 1006,
  },
  {
    exercise: { id: 7, name: 'Weighted Chin-ups', intensities: [], pull: true },
    reps: null,
    AMRAP: true,
    sets: 3,
    weight: '35',
    intensity: null,
    tempo: 'self directed',
    id: 1007,
  },
  {
    exercise: {
      id: 8,
      name: 'Front lever holds with band',
      intensities: [
        'tuck',
        'advanced tuck',
        'single-leg',
        'closed straddle',
        'open straddle',
        'full',
      ],
      pull: true,
    },
    reps: 15,
    AMRAP: false,
    sets: 3,
    weight: null,
    intensity: 'full',
    tempo: null,
    id: 1008,
  },
  {
    exercise: {
      id: 9,
      name: 'MAPPU',
      intensities: ['tuck => straddle', 'tuck => full', 'straddle => full'],
      push: true,
    },
    reps: 2,
    AMRAP: false,
    sets: 3,
    weight: null,
    intensity: 'tuck => straddle',
    tempo: '5 second hold at bottom',
    id: 1009,
  },
  {
    exercise: {
      id: 10,
      name: 'Pseudo planche push-ups with lift',
      intensities: ['straddle', 'full'],
      push: true,
    },
    reps: 5,
    AMRAP: false,
    sets: 3,
    weight: null,
    intensity: 'full',
    tempo: '2 second lift',
    id: 1010,
  },
  {
    exercise: { id: 11, name: 'L-sit chin-ups', intensities: [], pull: true },
    reps: null,
    AMRAP: true,
    sets: 3,
    weight: null,
    intensity: null,
    tempo: 'self directed',
    id: 1011,
  },
  {
    exercise: {
      id: 12,
      name: 'Archer rows',
      leftRight: true,
      intensities: [],
      pull: true,
    },
    reps: 6,
    AMRAP: false,
    sets: 2,
    weight: null,
    intensity: null,
    tempo: null,
    id: 1012,
    leftRight: true,
  },
];

export const mockSession: Session = {
  id: 5,
  name: 'day one',
  items: mockSessionItems,
  order: 1,
};

export const mockWeek: Week = {
  id: 1,
  number: 1,
  sessions: [
    {
      id: 5,
      name: 'day one',
      items: [
        {
          exercise: {
            id: 1,
            name: 'Handstand push-up negative',
            intensities: ['bodyweight'],
            push: true,
          },
          reps: 1,
          AMRAP: false,
          sets: 5,
          weight: null,
          intensity: null,
          tempo: '5s eccentric, 2s hold',
          id: 1001,
        },
        {
          exercise: {
            id: 2,
            name: 'Handstand to planche negative with hold',
            intensities: [
              'tuck',
              'advanced tuck',
              'single-leg',
              'closed straddle',
              'open straddle',
              'full',
            ],
            push: true,
          },
          reps: 1,
          AMRAP: false,
          sets: 5,
          weight: null,
          intensity: 'closed straddle',
          tempo: '5 second hold at bottom',
          id: 1002,
        },
        {
          exercise: {
            id: 3,
            name: 'Band planche',
            intensities: [
              'tuck',
              'advanced tuck',
              'single-leg',
              'closed straddle',
              'open straddle',
              'full',
            ],
            push: true,
          },
          reps: 20,
          AMRAP: false,
          sets: 3,
          weight: null,
          intensity: 'full',
          tempo: null,
          id: 1003,
        },
        {
          exercise: {
            id: 4,
            name: 'Weighted dips',
            intensities: [],
            push: true,
          },
          reps: 8,
          AMRAP: false,
          sets: 4,
          weight: '35',
          intensity: null,
          tempo: 'self directed',
          id: 1004,
        },
      ],
      order: 1,
    },
    {
      id: 6,
      name: 'day two',
      items: [
        {
          exercise: {
            id: 1,
            name: 'Handstand push-up negative',
            intensities: ['bodyweight'],
            push: true,
          },
          reps: 1,
          AMRAP: false,
          sets: 5,
          weight: null,
          intensity: null,
          tempo: '5s eccentric, 2s hold',
          id: 1001,
        },
        {
          exercise: {
            id: 5,
            name: 'OAC negatives',
            intensities: [],
            pull: true,
          },
          reps: 2,
          AMRAP: false,
          sets: 2,
          weight: null,
          intensity: null,
          tempo: '5 second eccentric',
          id: 1005,
        },
        {
          exercise: {
            id: 6,
            name: 'Front lever raises top half',
            intensities: [
              'tuck',
              'advanced tuck',
              'single-leg',
              'closed straddle',
              'open straddle',
              'full',
            ],
            pull: true,
          },
          reps: 3,
          AMRAP: false,
          sets: 4,
          weight: null,
          intensity: 'single-leg',
          tempo: 'self directed',
          id: 1006,
        },
        {
          exercise: {
            id: 7,
            name: 'Weighted Chin-ups',
            intensities: [],
            pull: true,
          },
          reps: null,
          AMRAP: true,
          sets: 3,
          weight: '35',
          intensity: null,
          tempo: 'self directed',
          id: 1007,
        },
        {
          exercise: {
            id: 8,
            name: 'Front lever holds with band',
            intensities: [
              'tuck',
              'advanced tuck',
              'single-leg',
              'closed straddle',
              'open straddle',
              'full',
            ],
            pull: true,
          },
          reps: 15,
          AMRAP: false,
          sets: 3,
          weight: null,
          intensity: 'full',
          tempo: null,
          id: 1008,
        },
      ],
      order: 2,
    },
    {
      id: 7,
      name: 'day three',
      items: [
        {
          exercise: {
            id: 2,
            name: 'Handstand to planche negative with hold',
            intensities: [
              'tuck',
              'advanced tuck',
              'single-leg',
              'closed straddle',
              'open straddle',
              'full',
            ],
            push: true,
          },
          reps: 1,
          AMRAP: false,
          sets: 5,
          weight: null,
          intensity: 'closed straddle',
          tempo: '5 second hold at bottom',
          id: 1002,
        },
        {
          exercise: {
            id: 9,
            name: 'MAPPU',
            intensities: [
              'tuck => straddle',
              'tuck => full',
              'straddle => full',
            ],
            push: true,
          },
          reps: 2,
          AMRAP: false,
          sets: 3,
          weight: null,
          intensity: 'tuck => straddle',
          tempo: '5 second hold at bottom',
          id: 1009,
        },
        {
          exercise: {
            id: 10,
            name: 'Pseudo planche push-ups with lift',
            intensities: ['straddle', 'full'],
            push: true,
          },
          reps: 5,
          AMRAP: false,
          sets: 3,
          weight: null,
          intensity: 'full',
          tempo: '2 second lift',
          id: 1010,
        },
        {
          exercise: {
            id: 3,
            name: 'Band planche',
            intensities: [
              'tuck',
              'advanced tuck',
              'single-leg',
              'closed straddle',
              'open straddle',
              'full',
            ],
            push: true,
          },
          reps: 20,
          AMRAP: false,
          sets: 3,
          weight: null,
          intensity: 'full',
          tempo: null,
          id: 1003,
        },
        {
          exercise: {
            id: 4,
            name: 'Weighted dips',
            intensities: [],
            push: true,
          },
          reps: 8,
          AMRAP: false,
          sets: 4,
          weight: '35',
          intensity: null,
          tempo: 'self directed',
          id: 1004,
        },
      ],
      order: 3,
    },
    {
      id: 8,
      name: 'day four',
      items: [
        {
          exercise: {
            id: 1,
            name: 'Handstand push-up negative',
            intensities: ['bodyweight'],
            push: true,
          },
          reps: 1,
          AMRAP: false,
          sets: 5,
          weight: null,
          intensity: null,
          tempo: '5s eccentric, 2s hold',
          id: 1001,
        },
        {
          exercise: {
            id: 5,
            name: 'OAC negatives',
            intensities: [],
            pull: true,
          },
          reps: 2,
          AMRAP: false,
          sets: 2,
          weight: null,
          intensity: null,
          tempo: '5 second eccentric',
          id: 1005,
        },
        {
          exercise: {
            id: 6,
            name: 'Front lever raises top half',
            intensities: [
              'tuck',
              'advanced tuck',
              'single-leg',
              'closed straddle',
              'open straddle',
              'full',
            ],
            pull: true,
          },
          reps: 3,
          AMRAP: false,
          sets: 4,
          weight: null,
          intensity: 'single-leg',
          tempo: 'self directed',
          id: 1006,
        },
        {
          exercise: {
            id: 11,
            name: 'L-sit chin-ups',
            intensities: [],
            pull: true,
          },
          reps: null,
          AMRAP: true,
          sets: 3,
          weight: null,
          intensity: null,
          tempo: 'self directed',
          id: 1011,
        },
        {
          exercise: {
            id: 12,
            name: 'Archer rows',
            leftRight: true,
            intensities: [],
            pull: true,
          },
          reps: 6,
          AMRAP: false,
          sets: 2,
          weight: null,
          intensity: null,
          tempo: null,
          id: 1012,
          leftRight: true,
        },
      ],
      order: 4,
    },
  ],
};

export const mockProgram: Program = {
  id: 1,
  name: 'Program 1',
  weeks: [
    mockWeek,
    { ...mockWeek, id: 2, number: 2 },
    { ...mockWeek, id: 3, number: 3 },
    { ...mockWeek, id: 4, number: 4 },
    { ...mockWeek, id: 5, number: 5 },
    { ...mockWeek, id: 6, number: 6 }
  ]
};

export const mockPrograms: Program[] = [
  mockProgram,
  {
    ...mockProgram,
    id: 2,
    name: 'Program 2'
  }
]