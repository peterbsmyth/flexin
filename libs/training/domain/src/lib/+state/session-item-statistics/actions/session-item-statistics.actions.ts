import { createAction, props } from '@ngrx/store';
import { SessionItem, SessionItemStatistic } from '@bod/shared/models';

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

export const loadSessionItemStatisticBySessionItem = createAction(
  '[SessionItemStatistics] Load SessionItemStatistic by SessionItem',
  props<{ sessionItem: SessionItem }>()
);

export const loadSessionItemStatisticBySessionItemSuccess = createAction(
  '[SessionItemStatistics] Load SessionItemStatistic by SessionItem Success',
  props<{ sessionItemStatistic: SessionItemStatistic }>()
);

export const loadSessionItemStatisticBySessionItemFailure = createAction(
  '[SessionItemStatistics] Load SessionItemStatistic by SessionItem Failure',
  props<{ error: any }>()
);

export const saveSessionItemStatisticBySessionItem = createAction(
  '[SessionItemStatistics] Save SessionItemStatistic By SessionItem',
  props<{ sessionItem: SessionItem }>()
);

export const saveSessionItemStatisticBySessionItemSuccess = createAction(
  '[SessionItemStatistics] Save SessionItemStatistic By SessionItem Success',
  props<{ sessionItemStatistic: SessionItemStatistic }>()
);

export const saveSessionItemStatisticBySessionItemFailure = createAction(
  '[SessionItemStatistics] Save SessionItemStatistic By SessionItem Failure',
  props<{ error: any }>()
);

export const saveSessionItemStatistic = createAction(
  '[SessionItemStatistics] Save SessionItemStatistic',
  props<{ sessionItemStatistic: SessionItemStatistic }>()
);

export const saveSessionItemStatisticSuccess = createAction(
  '[SessionItemStatistics] Save SessionItemStatistic Success',
  props<{ sessionItemStatistic: SessionItemStatistic }>()
);

export const saveSessionItemStatisticFailure = createAction(
  '[SessionItemStatistics] Save SessionItemStatistic Failure',
  props<{ error: any }>()
);

export const updateSessionItemStatistic = createAction(
  '[SessionItemStatistics] Update SessionItemStatistic',
  props<{ sessionItemStatistic: SessionItemStatistic }>()
);

export const updateSessionItemStatisticSuccess = createAction(
  '[SessionItemStatistics] Update SessionItemStatistic Success'
);

export const updateSessionItemStatisticFailure = createAction(
  '[SessionItemStatistics] Update SessionItemStatistic Failure',
  props<{ error: any }>()
);

export const selectSessionItemStatistic = createAction(
  '[SessionItemStatistics] Select SessionItemStatistic',
  props<{ id: number }>()
);
