import { Component, OnInit } from '@angular/core';
import { Category, Exercise } from '@bod/shared/models';
import {
  CategoriesFacade,
  deleteExerciseCategory,
  deleteIntensity,
  ExercisesFacade,
  loadCategories,
  saveExerciseCategory,
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

  constructor(
    public exercisesState: ExercisesFacade,
    public categoriesState: CategoriesFacade
  ) {}

  onSave(exercise) {
    this.exercisesState.dispatch(
      updateExercise({
        exercise,
      })
    );
  }

  onSaveCategory(exercise: Exercise, category: Category) {
    this.exercisesState.dispatch(
      saveExerciseCategory({
        exercise,
        category,
      })
    );
  }

  onDeleteCategory(exercise, category) {
    this.exercisesState.dispatch(
      deleteExerciseCategory({
        exercise,
        category,
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

  ngOnInit() {
    this.categoriesState.dispatch(loadCategories());
  }
}
