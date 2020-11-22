import { SetStatisticV2 } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

export const loadV2SetStatistics = createAction(
  '[V2SetStatistics] Load V2SetStatistics'
);

export const loadV2SetStatisticsSuccess = createAction(
  '[V2SetStatistics] Load V2SetStatistics Success',
  props<{ v2SetStatistics: SetStatisticV2[] }>()
);

export const loadV2SetStatisticsFailure = createAction(
  '[V2SetStatistics] Load V2SetStatistics Failure',
  props<{ error: any }>()
);

export const updateV2SetStatistic = createAction(
  '[V2SetStatistics] Update V2SetStatistic',
  props<{ v2SetStatistic: Partial<SetStatisticV2> }>()
);
