import { createAction, props } from '@ngrx/store';
import { Session, SessionStatistic } from '@bod/shared/models';

export const loadSessionStatistics = createAction(
  '[SessionStatistics] Load SessionStatistics'
);

export const loadSessionStatisticsSuccess = createAction(
  '[SessionStatistics] Load SessionStatistics Success',
  props<{ sessionStatistics: SessionStatistic[] }>()
);

export const loadSessionStatisticsFailure = createAction(
  '[SessionStatistics] Load SessionStatistics Failure',
  props<{ error: any }>()
);

export const loadSessionStatisticBySession = createAction(
  '[SessionStatistics] Load SessionStatistic By Session',
  props<{ session: Session }>()
);

export const loadSessionStatisticBySessionSuccess = createAction(
  '[SessionStatistics] Load SessionStatistic By Session Success',
  props<{ sessionStatistic: SessionStatistic }>()
);

export const loadSessionStatisticBySessionFailure = createAction(
  '[SessionStatistics] Load SessionStatistic By Session Failure',
  props<{ error: any }>()
);

export const saveSessionStatisticBySession = createAction(
  '[SessionStatistics] Save SessionStatistic By Session',
  props<{ session: Session }>()
);

export const saveSessionStatisticBySessionSuccess = createAction(
  '[SessionStatistics] Save SessionStatistic By Session Success',
  props<{ sessionStatistic: SessionStatistic }>()
);

export const saveSessionStatisticBySessionFailure = createAction(
  '[SessionStatistics] Save SessionStatistic By Session Failure',
  props<{ error: any }>()
);
