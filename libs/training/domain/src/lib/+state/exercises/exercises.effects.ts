import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { CategoriesDataService } from '../../infrastructure/categories.data.service';
import { ExercisesDataService } from '../../infrastructure/exercises.data.service';
import * as ExercisesActions from './exercises.actions';

@Injectable()
export class ExercisesEffects {
  loadExercise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesActions.loadExerciseFromGuard),
      fetch({
        run: ({ id }) => {
          return this.backend
            .getOne(id)
            .pipe(
              map((exercise) =>
                ExercisesActions.loadExerciseSuccess({ exercise })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ExercisesActions.loadExerciseFailure({ error });
        },
      })
    )
  );

  loadExercises$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesActions.loadExercises),
      fetch({
        run: () => {
          return this.backend
            .getAll()
            .pipe(
              map((exercises) =>
                ExercisesActions.loadExercisesSuccess({ exercises })
              )
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ExercisesActions.loadExercisesFailure({ error });
        },
      })
    )
  );

  updateExercise$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesActions.updateExercise),
      optimisticUpdate({
        run: (action) => {
          return this.backend
            .patchOne(action.exercise)
            .pipe(mapTo(ExercisesActions.updateExerciseSuccess()));
        },
        undoAction: (action, error) => {
          console.error('Error', error);
          return ExercisesActions.updateExerciseFailure({
            error,
          });
        },
      })
    )
  );

  saveCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesActions.saveCategory),
      switchMap(({ exercise, category }) =>
        this.backend.saveCategory(exercise, category).pipe(
          map(({ exercise: e, category: c }) =>
            ExercisesActions.saveCategorySuccess({
              exercise: e,
              category: c,
            })
          )
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesActions.deleteCategory),
      switchMap(({ exercise, categoryId }) =>
        this.categoryService
          .deleteOne(categoryId)
          .pipe(map(() => ExercisesActions.deleteCategorySuccess()))
      )
    )
  );

  saveIntensity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesActions.saveIntensity),
      switchMap(({ exercise, intensity }) =>
        this.backend.saveIntensity(exercise, intensity).pipe(
          map(({ exercise: e, intensity: i }) =>
            ExercisesActions.saveIntensitySuccess({
              exercise: e,
              intensity: i,
            })
          )
        )
      )
    )
  );

  deleteIntensity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExercisesActions.deleteIntensity),
      switchMap(({ exercise, intensityId }) =>
        this.backend
          .deleteIntensity(intensityId)
          .pipe(map(() => ExercisesActions.deleteIntensitySuccess()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backend: ExercisesDataService,
    private categoryService: CategoriesDataService
  ) {}
}
