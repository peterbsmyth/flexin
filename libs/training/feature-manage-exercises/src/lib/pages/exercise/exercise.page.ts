import { Component, OnInit } from '@angular/core';
import { ExercisesFacade, updateExercise } from '@bod/training/domain';
import { Exercise } from '@bod/shared/models';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  exercise$: Observable<Exercise>;

  constructor(public exercisesState: ExercisesFacade) {}

  onSave(exercise: Exercise) {
    this.exercisesState.dispatch(
      updateExercise({
        exercise,
      })
    );
  }

  ngOnInit() {}
}
