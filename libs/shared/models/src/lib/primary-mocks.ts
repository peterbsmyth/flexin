import { Exercise, Session, SessionItem, Week, Program } from './primary-models';

export const mockExercises: Exercise[] = [
  {
      "id": 1,
      "name": "Handstand push-up negative",
      "push": true,
      "pull": null,
      "intensities": [
          "bodyweight"
      ],
      "leftRight": null
  },
  {
      "id": 2,
      "name": "Handstand to planche negative with hold",
      "push": true,
      "pull": null,
      "intensities": [
          "tuck",
          "advanced tuck",
          "single-leg",
          "closed straddle",
          "open straddle",
          "full"
      ],
      "leftRight": null
  },
  {
      "id": 3,
      "name": "Band planche",
      "push": true,
      "pull": null,
      "intensities": [
          "tuck",
          "advanced tuck",
          "single-leg",
          "closed straddle",
          "open straddle",
          "full"
      ],
      "leftRight": null
  },
  {
      "id": 5,
      "name": "90 Degree Pushup",
      "push": true,
      "pull": null,
      "intensities": [
          "bodyweight",
          "weighted"
      ],
      "leftRight": null
  }
];

export const mockSessionItems: SessionItem[] = [
  {
      "id": 1,
      "reps": 1,
      "AMRAP": false,
      "leftRight": true,
      "sets": 5,
      "weight": "none",
      "intensity": "bodyweight",
      "tempo": "5s eccentric, 2s hold",
      "exerciseId": 1,
      "sessionId": 1
  },
  {
      "id": 2,
      "reps": 1,
      "AMRAP": false,
      "leftRight": null,
      "sets": 5,
      "weight": "none",
      "intensity": "closed straddle",
      "tempo": "5 second hold at bottom",
      "exerciseId": 2,
      "sessionId": 2
  },
  {
      "id": 3,
      "reps": 20,
      "AMRAP": false,
      "leftRight": null,
      "sets": 3,
      "weight": "none",
      "intensity": "full",
      "tempo": "n/a",
      "exerciseId": 3,
      "sessionId": 3
  },
  {
      "id": 4,
      "reps": 8,
      "AMRAP": false,
      "leftRight": null,
      "sets": 4,
      "weight": "35",
      "intensity": "n/a",
      "tempo": "self directed",
      "exerciseId": 4,
      "sessionId": 4
  }
];

export const mockSession: Session = {
  "id": 1,
  "name": "day one",
  "order": 1,
  "weekId": 1
};

export const mockWeek: Week = {
  "id": 1,
  "number": 1,
  "programId": 1
};

export const mockProgram: Program = {
  id: 1,
  name: 'Program 1',
};

export const mockPrograms: Program[] = [
  mockProgram,
  {
    ...mockProgram,
    id: 2,
    name: 'Program 2'
  }
]