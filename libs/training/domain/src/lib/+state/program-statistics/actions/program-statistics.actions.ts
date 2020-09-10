import { createAction, props } from '@ngrx/store';
import { ProgramStatistic } from '@bod/shared/models';

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

export const saveProgramStatistic = createAction(
  '[ProgramStatistics] Save ProgramStatistic',
  props<{ programStatistic: ProgramStatistic }>()
);

export const saveProgramStatisticSuccess = createAction(
  '[ProgramStatistics] Save ProgramStatistic Success',
  props<{ programStatistic: ProgramStatistic }>()
);

export const saveProgramStatisticFailure = createAction(
  '[ProgramStatistics] Save ProgramStatistic Failure',
  props<{ error: any }>()
);

export const updateProgramStatistic = createAction(
  '[ProgramStatistics] Update ProgramStatistic',
  props<{ programStatistic: ProgramStatistic }>()
);

export const updateProgramStatisticSuccess = createAction(
  '[ProgramStatistics] Update ProgramStatistic Success'
);

export const updateProgramStatisticFailure = createAction(
  '[ProgramStatistics] Update ProgramStatistic Failure',
  props<{ error: any }>()
);
