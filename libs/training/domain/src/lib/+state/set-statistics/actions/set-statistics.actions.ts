import { createAction, props } from '@ngrx/store';
import { SetStatistic } from '@bod/shared/models';

export const loadSetStatistics = createAction(
  '[SetStatistics] Load SetStatistics'
);

export const loadSetStatisticsSuccess = createAction(
  '[SetStatistics] Load SetStatistics Success',
  props<{ setStatistics: SetStatistic[] }>()
);

export const loadSetStatisticsFailure = createAction(
  '[SetStatistics] Load SetStatistics Failure',
  props<{ error: any }>()
);

export const loadSetStatisticsWithAscendants = createAction(
  '[SetStatistics] Load SetStatistics with ascendants'
);

export const loadSetStatisticsWithAscendantsSuccess = createAction(
  '[SetStatistics] Load SetStatistics with ascendants Success'
);

export const loadSetStatisticsWithAscendantsFailure = createAction(
  '[SetStatistics] Load SetStatistics with ascendants Failure',
  props<{ error: any }>()
);

export const saveSetStatistic = createAction(
  '[SetStatistics] Save SetStatistic',
  props<{ setStatistic: SetStatistic }>()
);

export const saveSetStatisticSuccess = createAction(
  '[SetStatistics] Save SetStatistic Success',
  props<{ setStatistic: SetStatistic }>()
);

export const saveSetStatisticFailure = createAction(
  '[SetStatistics] Save SetStatistic Failure',
  props<{ error: any }>()
);

export const updateSetStatistic = createAction(
  '[SetStatistics] Update SetStatistic',
  props<{ setStatistic: SetStatistic }>()
);

export const updateSetStatisticSuccess = createAction(
  '[SetStatistics] Update SetStatistic Success'
);

export const updateSetStatisticFailure = createAction(
  '[SetStatistics] Update SetStatistic Failure',
  props<{ error: any }>()
);

export const loadSetStatisticsBySessionItemStatistic = createAction(
  '[SetStatistics] Load SetStatistics by SessionItemStatistic',
  props<{ id: number }>()
);

export const loadSetStatisticsBySessionItemStatisticSuccess = createAction(
  '[SetStatistics] Load SetStatistics by SessionItemStatistic Success',
  props<{ setStatistics: SetStatistic[] }>()
);

export const loadSetStatisticsBySessionItemStatisticFailure = createAction(
  '[SetStatistics] Load SetStatistics by SessionItemStatistic Failure',
  props<{ error: any }>()
);
