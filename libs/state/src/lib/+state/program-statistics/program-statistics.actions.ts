import { createAction, props } from '@ngrx/store';
import { ProgramStatistic } from '@bod/models';

export const loadProgramStatistics = createAction(
  '[ProgramStatistics] Load ProgramStatistics'
);

export const loadProgramStatisticsSuccess = createAction(
  '[ProgramStatistics] Load ProgramStatistics Success',
  props<{ programStatistics: ProgramStatistic[] }>()
);

export const loadProgramStatisticsFailure = createAction(
  '[ProgramStatistics] Load ProgramStatistics Failure',
  props<{ error: any }>()
);
