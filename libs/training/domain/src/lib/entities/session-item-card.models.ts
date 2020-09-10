import { Exercise, SessionItem, SessionItemStatistic, SetStatistic } from '@bod/shared/models';

export interface SessionItemCardData {
  exercise: Exercise;
  sessionItem: SessionItem;
  sessionItemStatistic: SessionItemStatistic;
  setStatistics: SetStatistic[];
}

export interface SessionItemCardOutput {
  sessionItemStatistic: SessionItemStatistic;
  setStatistics: SetStatistic[];
}