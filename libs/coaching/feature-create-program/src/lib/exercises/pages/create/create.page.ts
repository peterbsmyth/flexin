import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExercisesFacade, ExercisesApiActions } from '@bod/coaching/domain';

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
      ExercisesApiActions.saveExercise({ exercise })
    );
    this.router.navigate(['exercises'])
  }
}
