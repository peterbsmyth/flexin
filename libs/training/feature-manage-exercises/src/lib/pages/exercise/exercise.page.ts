import { Component, OnInit } from '@angular/core';
import { Exercise } from '@bod/shared/models';
import {
  deleteCategory,
  deleteIntensity,
  ExercisesFacade,
  saveCategory,
  saveIntensity,
  updateExercise,
} from '@bod/training/domain';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  exercise$: Observable<Exercise>;

  constructor(public exercisesState: ExercisesFacade) {}

  onSave(exercise) {
    this.exercisesState.dispatch(
      updateExercise({
        exercise,
      })
    );
  }

  onSaveCategory({ exercise, category }) {
    this.exercisesState.dispatch(
      saveCategory({
        exercise,
        category,
      })
    );
  }

  onDeleteCategory({ exercise, categoryId }) {
    this.exercisesState.dispatch(
      deleteCategory({
        exercise,
        categoryId,
      })
    );
  }

  onSaveIntensity({ exercise, intensity }) {
    this.exercisesState.dispatch(
      saveIntensity({
        exercise,
        intensity,
      })
    );
  }

  onDeleteIntensity({ exercise, intensityId }) {
    this.exercisesState.dispatch(
      deleteIntensity({
        exercise,
        intensityId,
      })
    );
  }

  ngOnInit() {}
}
