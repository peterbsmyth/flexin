import { Component, OnInit } from '@angular/core';
import { Exercise } from '@bod/shared/models';
import { ExercisesFacade, loadExercises } from '@bod/training/domain';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {
  exercises$: Observable<Exercise[]>;
  loaded$: Observable<boolean>;
  constructor(public exercisesState: ExercisesFacade) {}

  ngOnInit(): void {
    this.exercisesState.dispatch(loadExercises());
  }
}
