import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '@bod/shared/models';
import { loadExercises, ExercisesFacade } from '@bod/training/domain';

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
