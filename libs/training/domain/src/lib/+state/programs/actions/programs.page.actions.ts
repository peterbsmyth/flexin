import { createAction, props } from '@ngrx/store';
import { Program } from '@bod/shared/models';

import {
  BoardCardData,
  SessionItemData,
} from '../../../entities/component.models';

export const loadProgramsFromInputFeatureProgramsPage = createAction(
  '[Programs][Input Workout][Programs Page] Load Programs'
);

export const loadProgramsSuccess = createAction(
  '[Programs] Load Programs Success',
  props<{ programs: Program[] }>()
);

export const loadProgramsFailure = createAction(
  '[Programs] Load Programs Failure',
  props<{ error: any }>()
);

export const loadProgramFromInputFeatureProgramPage = createAction(
  '[Programs][Input Workout][Program Page] Load Program',
  props<{ id: number }>()
);

export const loadProgramFromWeekStatisticEffect = createAction(
  '[Programs][Week Statistic Effect] Load Program',
  props<{ id: number }>()
);

export const loadProgramSuccess = createAction(
  '[Programs] Load Program Success',
  props<{ program: Program }>()
);

export const loadProgramFailure = createAction(
  '[Programs] Load Program Failure',
  props<{ error: any }>()
);

export const loadProgramsFromCreateFeatureProgramsPage = createAction(
  '[Programs][Create][Programs Page] Load Programs'
);

export const loadProgramsFromCreateFeatureCreatePage = createAction(
  '[Programs][Create][Create Page] Load Programs'
);

export const loadProgramFromGuard = createAction(
  '[Programs][Create][Guard] Load Program',
  props<{ id: number }>()
);

export const selectProgramFromGuard = createAction(
  '[Programs][Create] Select Program',
  props<{ id: number }>()
);

export const addIncompleteSessionItemsFromCreateFeatureProgramBoardPage = createAction(
  '[Programs][Create][Program Board Page] Add Incomplete Session Items',
  props<{ lists: BoardCardData[][] }>()
);

export const createProgramFromCreateFeatureSessionPage = createAction(
  '[Programs][Create][Session Page] Create Program',
  props<{ data: SessionItemData[]; name: string }>()
);

export const createProgramSuccess = createAction(
  '[Programs][Create] Create Program Success',
  props<{ name: string }>()
);

export const createProgramFailure = createAction(
  '[Programs][Create] Create Program Failure',
  props<{ name: string }>()
);

export const loadDescendantsFromCreateFeatureProgramPage = createAction(
  '[Programs][Create][Program Page] Load Descendants',
  props<{ id: number }>()
);

export const loadDescendantsSuccess = createAction(
  '[Programs][Create] Load Descendants Success'
);

export const loadDescendantsFailure = createAction(
  '[Programs][Create] Load Descendants Failure',
  props<{ error: any }>()
);
