import {
  Exercise,
  Program,
  Session,
  SessionItem,
  SessionItemStatistic,
  SetStatistic,
  Week,
} from '@bod/shared/models';

export interface SessionItemData {
  sessionItem: SessionItem;
  exercise: Exercise;
}

export interface SessionItemFormData {
  sessionItem: SessionItem;
  exercises: Exercise[];
}

export interface BoardCardData {
  id?: number;
  name: string;
  category?: string;
  routerLink?: string;
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

export interface ProgramWithDescendants {
  program: Program;
  weeks: Week[];
  sessions: Session[];
  sessionItems: SessionItem[];
  exercises: Exercise[];
}
