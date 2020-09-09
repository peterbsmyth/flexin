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
