import {
  Exercise,
  Session,
  SessionItem,
  SessionItemStatistic,
  SetStatistic,
} from '@bod/shared/models';

export interface SessionItemData {
  sessionItem: SessionItem;
  exercise: Exercise;
}

export interface ProgramBoardData {
  sessions: Session[];
  exercises: Exercise[];
  sessionItems: SessionItem[];
  draft?: BoardCardData[][];
}

export interface SessionItemFormData {
  sessionItem: SessionItem;
  exercises: Exercise[];
}

export interface BoardCardData {
  sessionItem: SessionItem;
  exercise: Exercise;
}

export interface SessionItemBoardCardData {
  exercise: Exercise;
  sessionItem: SessionItem;
  sessionItemStatistic: SessionItemStatistic;
  setStatistics: SetStatistic[];
}

export interface SessionItemCardOutput {
  sessionItemStatistic: SessionItemStatistic;
  setStatistics: SetStatistic[];
}
