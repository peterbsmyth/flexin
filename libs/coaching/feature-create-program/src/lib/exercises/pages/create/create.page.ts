import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExercisesFacade, ExercisesActions } from '@bod/coaching/domain';

@Component({
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  constructor(
    private exercisesState: ExercisesFacade,
    private router: Router
    ) {}

  ngOnInit(): void {}

  onSave(exercise) {
    this.exercisesState.dispatch(
      ExercisesActions.saveExercise({ exercise })
    );
    this.router.navigate(['exercises'])
  }
}
