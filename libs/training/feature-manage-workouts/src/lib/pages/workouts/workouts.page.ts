import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetStatistic, Workout } from '@bod/shared/models';
import {
  ProgramsFacade,
  selectWorkout,
  updateWorkout,
  updateSetStatistic,
} from '@bod/training/domain';

@Component({
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit {
  constructor(
    public programsState: ProgramsFacade,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSaveSet(setStatistic: Partial<SetStatistic>) {
    this.programsState.dispatch(updateSetStatistic({ setStatistic }));
  }

  onSaveWorkout(workout: Partial<Workout>) {
    console.log(workout);
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
