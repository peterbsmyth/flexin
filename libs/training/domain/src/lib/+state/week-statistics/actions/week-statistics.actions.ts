import { createAction, props } from '@ngrx/store';
import { WeekStatistic } from '@bod/shared/models';

export const loadWeekStatistics = createAction(
  '[WeekStatistics] Load WeekStatistics'
);

export const loadWeekStatisticsSuccess = createAction(
  '[WeekStatistics] Load WeekStatistics Success',
  props<{ weekStatistics: WeekStatistic[] }>()
);

export const loadWeekStatisticsFailure = createAction(
  '[WeekStatistics] Load WeekStatistics Failure',
  props<{ error: any }>()
);

export const saveWeekStatistic = createAction(
  '[WeekStatistics] Save WeekStatistic',
  props<{ weekStatistic: WeekStatistic }>()
);

export const saveWeekStatisticSuccess = createAction(
  '[WeekStatistics] Save WeekStatistic Success',
  props<{ weekStatistic: WeekStatistic }>()
);

export const saveWeekStatisticFailure = createAction(
  '[WeekStatistics] Save WeekStatistic Failure',
  props<{ error: any }>()
);

export const updateWeekStatistic = createAction(
  '[WeekStatistics] Update WeekStatistic',
  props<{ weekStatistic: WeekStatistic }>()
);

export const updateWeekStatisticSuccess = createAction(
  '[WeekStatistics] Update WeekStatistic Success'
);

export const updateWeekStatisticFailure = createAction(
  '[WeekStatistics] Update WeekStatistic Failure',
  props<{ error: any }>()
);
