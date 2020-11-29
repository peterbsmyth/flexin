import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CategoriesEffects } from './+state/categories/categories.effects';
import { ExercisesEffects } from './+state/exercises/exercises.effects';
import { FoodsEffects } from './+state/foods/foods.effects';
import { MealPlansEffects } from './+state/meal-plans/meal-plans.effects';
import { MealsEffects } from './+state/meals/meals.effects';
import { ProgramsEffects } from './+state/programs/programs.effects';
import { totalReducer } from './+state/reducer';
import { SetStatisticsEffects } from './+state/set-statistics/set-statistics.effects';
import { WorkoutsEffects } from './+state/workouts/workouts.effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('training', totalReducer),
    EffectsModule.forFeature([
      WorkoutsEffects,
      CategoriesEffects,
      ExercisesEffects,
      SetStatisticsEffects,
      ProgramsEffects,
      MealPlansEffects,
      MealsEffects,
      FoodsEffects,
    ]),
    MatSnackBarModule,
  ],
  providers: [],
})
export class TrainingDomainModule {}
