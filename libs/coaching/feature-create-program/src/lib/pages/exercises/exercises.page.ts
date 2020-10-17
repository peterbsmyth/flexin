import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '@bod/shared/models';
import { ExercisesFacade, ExercisesActions } from '@bod/coaching/domain';

@Component({
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss']
})
export class ExercisesPage implements OnInit {
  exercises$: Observable<Exercise[]>;
  loaded$: Observable<boolean>;
  constructor(private exercisesState: ExercisesFacade) {
    this.exercises$ = this.exercisesState.allExercises$;
    this.loaded$ = this.exercisesState.loaded$;
  }

  ngOnInit(): void {
    this.exercisesState.dispatch(ExercisesActions.loadExercises());
  }
}
