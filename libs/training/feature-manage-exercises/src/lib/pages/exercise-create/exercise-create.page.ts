import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExercisesFacade } from '@bod/training/domain';

@Component({
  templateUrl: './exercise-create.page.html',
  styleUrls: ['./exercise-create.page.scss'],
})
export class ExerciseCreatePage implements OnInit {
  constructor(
    private exercisesState: ExercisesFacade,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSave(exercise) {
    // this.exercisesState.dispatch(
    //   saveExerciseFromPage({ exercise })
    // );
    this.router.navigate(['exercises']);
  }
}
