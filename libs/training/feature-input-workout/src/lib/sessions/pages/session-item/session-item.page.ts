import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import {
  SessionsFacade,
  SessionItemsFacade,
  SessionItemsPageActions,
  SessionItemStatisticsActions,
  SetStatisticsActions,
  SessionItemStatisticsFacade,
  SetStatisticsFacade,
  ExercisesFacade,
  ExercisesApiActions,
  SessionItemCardData,
  SessionItemCardOutput,
} from '@bod/training/domain';
import {
  SessionItem,
  Pages,
  SessionItemStatistic,
  SetStatistic,
} from '@bod/shared/models';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bod-session-item',
  templateUrl: './session-item.page.html',
  styleUrls: ['./session-item.page.scss'],
})
export class SessionItemPage implements OnInit {
  data$: Observable<SessionItemCardData>;
  sessionItem$: Observable<SessionItem>;
  sessionItemStatistic$: Observable<SessionItemStatistic>;
  setStatistics$: Observable<SetStatistic[]>;
  sessionItemsLoaded$: Observable<boolean>;
  pages$: Observable<Pages>;

  constructor(
    private exercisesState: ExercisesFacade,
    private sessionsState: SessionsFacade,
    private sessionItemsState: SessionItemsFacade,
    private sessionItemStatisticsState: SessionItemStatisticsFacade,
    private setStatisticsState: SetStatisticsFacade,
    private route: ActivatedRoute
  ) {
    this.sessionItemsLoaded$ = this.sessionsState.allSessionItems$.pipe(
      filter((sessions) => !!sessions),
      map((sessions) => sessions.every((s) => s))
    );
    this.data$ = combineLatest([
      this.exercisesState.allExercises$,
      this.sessionItemsState.selectedSessionItems$,
      this.sessionItemStatisticsState.allSessionItemStatistics$,
      this.setStatisticsState.allSetStatistics$,
    ]).pipe(
      map(([exercises, sessionItem, sessionItemStatistics, setStatistics]) => ({
        exercise: exercises[0],
        sessionItem,
        sessionItemStatistic: sessionItemStatistics[0],
        setStatistics,
      }))
    );
    this.pages$ = this.sessionItemsState.pages$;
  }

  ngOnInit(): void {
    this.sessionsState.dispatch(
      SessionItemsPageActions.loadSessionItemsBySession({
        id: this.route.parent.snapshot.params['sessionId'],
      })
    );
    this.sessionsState.dispatch(
      SessionItemStatisticsActions.loadSessionItemStatistics()
    );
    this.sessionsState.dispatch(SetStatisticsActions.loadSetStatistics());
    this.sessionsState.dispatch(ExercisesApiActions.loadExercises());
  }

  onSave(output: SessionItemCardOutput) {
    const {
      sessionItemStatistic,
      setStatistics
    } = output;
    if (sessionItemStatistic.id) {
      this.sessionsState.dispatch(
        SessionItemStatisticsActions.updateSessionItemStatistic({
          sessionItemStatistic
        })
      );
    } else {
      this.sessionsState.dispatch(
        SessionItemStatisticsActions.saveSessionItemStatistic({
          sessionItemStatistic
        })
      );
    }
    setStatistics.forEach((setStatistic) => {
      if (setStatistic.id) {
        this.sessionsState.dispatch(
          SetStatisticsActions.updateSetStatistic({ setStatistic })
        );
      } else {
        this.sessionsState.dispatch(
          SetStatisticsActions.saveSetStatistic({ setStatistic })
        );
      }
    });
  }
}
