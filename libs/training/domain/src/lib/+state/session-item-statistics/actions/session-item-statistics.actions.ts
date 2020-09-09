import { createAction, props } from '@ngrx/store';
import { SessionItemStatistic } from '@bod/shared/models';

export const loadSessionItemStatistics = createAction(
  '[SessionItemStatistics] Load SessionItemStatistics'
);

export const loadSessionItemStatisticsSuccess = createAction(
  '[SessionItemStatistics] Load SessionItemStatistics Success',
  props<{ sessionItemStatistics: SessionItemStatistic[] }>()
);

export const loadSessionItemStatisticsFailure = createAction(
  '[SessionItemStatistics] Load SessionItemStatistics Failure',
  props<{ error: any }>()
);
