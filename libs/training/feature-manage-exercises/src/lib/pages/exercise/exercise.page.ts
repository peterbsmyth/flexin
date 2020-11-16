import { Component, OnInit } from '@angular/core';
import { V2ExercisesFacade, updateExercise } from '@bod/training/domain';
import { ExerciseV2 } from '@bod/shared/models';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  exercise$: Observable<ExerciseV2>;

  constructor(public exercisesState: V2ExercisesFacade) {}

  onSave(exercise: ExerciseV2) {
    this.exercisesState.dispatch(
      updateExercise({
        exercise,
      })
    );
  }

  ngOnInit() {}
}
