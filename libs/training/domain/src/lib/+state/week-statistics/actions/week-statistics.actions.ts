import { createAction, props } from '@ngrx/store';
import { Week, WeekStatistic } from '@bod/shared/models';

export const loadWeekStatistic = createAction(
  '[WeekStatistics] Load WeekStatistic'
);

export const loadWeekStatisticSuccess = createAction(
  '[WeekStatistics] Load WeekStatistic Success',
  props<{ weekStatistic: WeekStatistic }>()
);

export const loadWeekStatisticFailure = createAction(
  '[WeekStatistics] Load WeekStatistic Failure',
  props<{ error: any }>()
);

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

export const loadWeekStatisticsFailureReset = createAction(
  '[WeekStatistics] Load WeekStatistics Failure Reset'
);

export const loadWeekStatisticByWeek = createAction(
  '[WeekStatistics] Load WeekStatistic By Week',
  props<{ week: Week }>()
);

export const loadWeekStatisticByWeekSuccess = createAction(
  '[WeekStatistics] Load WeekStatistic By Week Success',
  props<{ weekStatistic: WeekStatistic }>()
);

export const loadWeekStatisticByWeekFailure = createAction(
  '[WeekStatistics] Load WeekStatistic By Week Failure',
  props<{ error: any }>()
);

export const saveWeekStatisticByWeek = createAction(
  '[WeekStatistics] Save WeekStatistic By Week',
  props<{ week: Week }>()
);

export const saveWeekStatisticByWeekSuccess = createAction(
  '[WeekStatistics] Save WeekStatistic By Week Success',
  props<{ weekStatistic: WeekStatistic }>()
);

export const saveWeekStatisticByWeekFailure = createAction(
  '[WeekStatistics] Save WeekStatistic By Week Failure',
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

export const loadDescendants = createAction(
  '[WeekStatistics] Load Descendants',
  props<{ id: number }>()
);

export const loadDescendantsSuccess = createAction(
  '[WeekStatistics] Load Descendants Success'
);

export const loadDescendantsFailure = createAction(
  '[WeekStatistics] Load Descendants Failure',
  props<{ error: any }>()
);
