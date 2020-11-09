import { Component, OnInit } from '@angular/core';
import {
  WorkoutFormData,
  WorkoutsFacade,
  updateWorkoutFromWorkoutPage,
  loadV2Exercises,
  V2ExercisesFacade,
} from '@bod/training/domain';
import { Workout } from '@bod/shared/models';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit {
  data$: Observable<WorkoutFormData>;
  workout$: Observable<Workout>;

  constructor(
    private workoutsState: WorkoutsFacade,
    private exerciseState: V2ExercisesFacade
  ) {
    this.data$ = combineLatest([
      this.workoutsState.selectedWorkouts$,
      this.exerciseState.allV2Exercises$,
    ]).pipe(
      map(([workout, exercises]) => ({
        workout,
        exercises: exercises.sort((a, b) => a.name.localeCompare(b.name)),
      }))
    );
  }

  onSave(workout: Workout) {
    this.workoutsState.dispatch(
      updateWorkoutFromWorkoutPage({
        workout,
      })
    );
  }

  ngOnInit() {
    this.exerciseState.dispatch(loadV2Exercises());
  }
}
