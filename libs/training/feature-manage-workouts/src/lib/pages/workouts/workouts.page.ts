import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetStatistic, Workout } from '@bod/shared/models';
import {
  ProgramsFacade,
  selectWorkout,
  updateSetStatistic,
  updateWorkout,
} from '@bod/training/domain';

@Component({
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage {
  constructor(
    public programsState: ProgramsFacade,
    public route: ActivatedRoute
  ) {}

  onSaveSet(setStatistic: Partial<SetStatistic>) {
    this.programsState.dispatch(
      updateSetStatistic({
        setStatistic,
      })
    );
  }

  onSaveWorkout(workout: Partial<Workout>) {
    this.programsState.dispatch(
      updateWorkout({
        workout,
      })
    );
  }

  isWorkoutActive(id): boolean {
    const activeDay = +this.route.snapshot.queryParams['workoutId'];
    return activeDay === id;
  }

  selectWorkout(id: number) {
    this.programsState.dispatch(selectWorkout({ id }));
  }
}
