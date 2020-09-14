import {
  SessionItemStatistic,
  SetStatistic,
  SessionStatistic,
  WeekStatistic,
  ProgramStatistic,
  Playlist,
} from './statistic-models';

export const sessionItemStatisticMock: SessionItemStatistic = {
  id: 1,
  sessionItemId: 1,
  setStatistics: [1],
  rpe: 8,
  notes: 'not at my full strength',
};

export const setStatisticMock: SetStatistic = {
  id: 1,
  set: 1,
  reps: 10,
  weight: 25,
  sessionItemStatisticId: 1
};

export const sessionStatisticMock: SessionStatistic = {
  id: 1,
  session: 1,
  sessionItemStatistics: [1],
};

export const weekStatisticMock: WeekStatistic = {
  id: 1,
  week: 1,
  sessionStatistics: [1],
};

export const programStatisticMock: ProgramStatistic = {
  id: 1,
  program: 1,
  weekStatistics: [1],
};

export const playlistMock: Playlist = {
  id: 1,
  url:
    'https://www.youtube.com/playlist?list=PLu0SKb668nMfYcyc_Mpv1tcywXh2AJapj',
  week: 1,
};
