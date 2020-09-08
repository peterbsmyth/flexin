import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '@bod/shared/models';
import { ExercisesFacade, ExercisesApiActions } from '@bod/coaching/domain';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  exercises$: Observable<Exercise[]>;
  loaded$: Observable<boolean>;
  constructor(private exercisesState: ExercisesFacade) {
    this.exercises$ = this.exercisesState.allExercises$;
    this.loaded$ = this.exercisesState.loaded$;
  }

  ngOnInit(): void {
    this.exercisesState.dispatch(ExercisesApiActions.loadExercises());
  }
}
