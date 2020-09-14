import { Component, OnInit } from '@angular/core';
import { ExercisesFacade, ExercisesApiActions } from '@bod/coaching/domain';

@Component({
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  constructor(private exercisesState: ExercisesFacade) {}

  ngOnInit(): void {}

  onSave(exercise) {
    this.exercisesState.dispatch(
      ExercisesApiActions.saveExercise({ exercise })
    );
  }
}
