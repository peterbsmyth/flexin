import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { V2ProgramsFacade, selectWorkout } from '@bod/training/domain';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit {
  constructor(
    public programsState: V2ProgramsFacade,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSave(/*output: SessionItemCardOutput*/ output) {
    // const { sessionItemStatistic, setStatistics } = output;
    // /**
    //  * if there is an id, update the session item statistic
    //  * else, save a new session item statistic
    //  */
    // if (sessionItemStatistic.id) {
    //   this.sessionsState.dispatch(
    //     SessionItemStatisticsActions.updateSessionItemStatistic({
    //       sessionItemStatistic,
    //     })
    //   );
    // } else {
    //   this.sessionsState.dispatch(
    //     SessionItemStatisticsActions.saveSessionItemStatistic({
    //       sessionItemStatistic,
    //     })
    //   );
    // }
    // setStatistics.forEach((setStatistic) => {
    //   if (setStatistic.id) {
    //     this.sessionsState.dispatch(
    //       SetStatisticsActions.updateSetStatistic({ setStatistic })
    //     );
    //   } else {
    //     this.sessionsState.dispatch(
    //       SetStatisticsActions.saveSetStatistic({ setStatistic })
    //     );
    //   }
    // });
  }

  isWorkoutActive(id): boolean {
    const activeDay = +this.route.snapshot.queryParams['workoutId'];
    return activeDay === id;
  }

  selectWorkout(id: number) {
    this.programsState.dispatch(selectWorkout({ id }));
  }
}
