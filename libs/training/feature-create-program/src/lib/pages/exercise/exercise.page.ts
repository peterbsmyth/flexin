import { Component, OnInit } from '@angular/core';
import { ExercisesActions, ExercisesFacade } from '@bod/training/domain';
import { Exercise } from '@bod/shared/models';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  exercise$: Observable<Exercise>;

  constructor(private exercisesState: ExercisesFacade) {
    this.exercise$ = this.exercisesState.selectedExercises$;
  }

  onSave(exercise: Exercise) {
    this.exercisesState.dispatch(
      ExercisesActions.updateExerciseFromPage({
        exercise,
      })
    );
  }

  ngOnInit() {}
}
