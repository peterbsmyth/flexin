import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetStatisticV2, Workout } from '@bod/shared/models';
import {
  V2ProgramsFacade,
  selectWorkout,
  updateWorkout,
  updateV2SetStatistic,
} from '@bod/training/domain';

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

  onSaveSet(v2SetStatistic: Partial<SetStatisticV2>) {
    this.programsState.dispatch(updateV2SetStatistic({ v2SetStatistic }));
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
