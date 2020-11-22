import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WorkoutsEffects } from './+state/workouts/workouts.effects';
import { CategoriesEffects } from './+state/categories/categories.effects';
import { ProgramsEffects } from './+state/programs/programs.effects';
import { ExercisesEffects } from './+state/exercises/exercises.effects';
import { SetStatisticsEffects } from './+state/set-statistics/set-statistics.effects';
import { FoodsEffects } from './+state/foods/foods.effects';
import { MealsEffects } from './+state/meals/meals.effects';
import { MealPlansEffects } from './+state/meal-plans/meal-plans.effects';
import { totalReducer } from './+state/reducer';

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
