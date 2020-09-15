import { Component, OnInit } from '@angular/core';
import { ExercisesApiActions, ExercisesFacade } from '@bod/coaching/domain';
import { Exercise } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss']
})
export class ExercisePage implements OnInit {
  exercise$: Observable<Exercise>;

  constructor(
    private exercisesState: ExercisesFacade,
  ) {
    this.exercise$ = this.exercisesState.selectedExercises$;
  }

  onSave(exercise: Exercise) {
    this.exercisesState.dispatch(
      ExercisesApiActions.updateExercise({
        exercise,
      })
    );
  }

  ngOnInit() {}
}
