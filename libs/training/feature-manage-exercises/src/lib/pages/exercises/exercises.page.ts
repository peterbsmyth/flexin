import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExercisesFacade, loadExercises } from '@bod/training/domain';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {
  loaded$: Observable<boolean>;
  constructor(public exercisesState: ExercisesFacade, private router: Router) {}

  ngOnInit(): void {
    this.exercisesState.dispatch(loadExercises());
  }

  onUpdateExercise(exercise) {
    this.router.navigate(['/exercises', exercise.id]);
  }
}
