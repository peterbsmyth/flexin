import { SetStatistic } from '@bod/shared/models';
import { createAction, props } from '@ngrx/store';

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

export const updateSetStatistic = createAction(
  '[SetStatistics] Update SetStatistic',
  props<{ setStatistic: Partial<SetStatistic> }>()
);

export const updateSetStatisticSuccess = createAction(
  '[SetStatistics] Update SetStatistic Success',
  props<{ setStatistic: Partial<SetStatistic> }>()
);
