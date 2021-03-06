import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExercisesFacade, saveExercise } from '@bod/training/domain';

@Component({
  templateUrl: './exercise-create.page.html',
  styleUrls: ['./exercise-create.page.scss'],
})
export class ExerciseCreatePage {
  constructor(
    private exercisesState: ExercisesFacade,
    private router: Router
  ) {}

  onSave(exercise) {
    this.exercisesState.dispatch(saveExercise({ exercise }));
    this.router.navigate(['exercises']);
  }
}
