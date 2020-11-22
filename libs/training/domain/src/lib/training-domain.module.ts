import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPrograms from './+state/programs/programs.reducer';
import * as fromSessions from './+state/sessions/sessions.reducer';
import * as fromSessionItems from './+state/session-items/session-items.reducer';
import * as fromWeeks from './+state/weeks/weeks.reducer';
import { ProgramsEffects } from './+state/programs/programs.effects';
import { SessionItemsEffects } from './+state/session-items/session-items.effects';
import { SessionsEffects } from './+state/sessions/sessions.effects';
import { WeeksEffects } from './+state/weeks/weeks.effects';
import { HttpClientModule } from '@angular/common/http';
import * as fromSessionItemStatistics from './+state/session-item-statistics/session-item-statistics.reducer';
import { SessionItemStatisticsEffects } from './+state/session-item-statistics/session-item-statistics.effects';
import * as fromSetStatistics from './+state/set-statistics/set-statistics.reducer';
import { SetStatisticsEffects } from './+state/set-statistics/set-statistics.effects';
import * as fromExercises from './+state/exercises/exercises.reducer';
import { ExercisesEffects } from './+state/exercises/exercises.effects';
import * as fromWeekStatistics from './+state/week-statistics/week-statistics.reducer';
import { WeekStatisticsEffects } from './+state/week-statistics/week-statistics.effects';
import * as fromProgramStatistics from './+state/program-statistics/program-statistics.reducer';
import { ProgramStatisticsEffects } from './+state/program-statistics/program-statistics.effects';
import * as fromSessionStatistics from './+state/session-statistics/session-statistics.reducer';
import { SessionStatisticsEffects } from './+state/session-statistics/session-statistics.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import * as fromWorkouts from './+state/workouts/workouts.reducer';
import { WorkoutsEffects } from './+state/workouts/workouts.effects';
import * as fromCategories from './+state/categories/categories.reducer';
import { CategoriesEffects } from './+state/categories/categories.effects';
import * as fromV2Programs from './+state/v2-programs/v2-programs.reducer';
import { V2ProgramsEffects } from './+state/v2-programs/v2-programs.effects';
import * as fromV2Exercises from './+state/v2-exercises/v2-exercises.reducer';
import { V2ExercisesEffects } from './+state/v2-exercises/v2-exercises.effects';
import * as fromV2SetStatistics from './+state/v2-set-statistics/v2-set-statistics.reducer';
import { V2SetStatisticsEffects } from './+state/v2-set-statistics/v2-set-statistics.effects';
import * as fromFoods from './+state/foods/foods.reducer';
import { FoodsEffects } from './+state/foods/foods.effects';
import * as fromMeals from './+state/meals/meals.reducer';
import { MealsEffects } from './+state/meals/meals.effects';
import * as fromMealPlans from './+state/meal-plans/meal-plans.reducer';
import { MealPlansEffects } from './+state/meal-plans/meal-plans.effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(
      fromExercises.EXERCISES_FEATURE_KEY,
      fromExercises.reducer
    ),
    StoreModule.forFeature(
      fromProgramStatistics.PROGRAMSTATISTICS_FEATURE_KEY,
      fromProgramStatistics.reducer
    ),
    StoreModule.forFeature(
      fromPrograms.PROGRAMS_FEATURE_KEY,
      fromPrograms.reducer
    ),
    StoreModule.forFeature(
      fromSessionItems.SESSIONITEMS_FEATURE_KEY,
      fromSessionItems.reducer
    ),
    StoreModule.forFeature(
      fromSessionItemStatistics.SESSIONITEMSTATISTICS_FEATURE_KEY,
      fromSessionItemStatistics.reducer
    ),
    StoreModule.forFeature(
      fromSessions.SESSIONS_FEATURE_KEY,
      fromSessions.reducer
    ),
    StoreModule.forFeature(
      fromSetStatistics.SETSTATISTICS_FEATURE_KEY,
      fromSetStatistics.reducer
    ),
    StoreModule.forFeature(
      fromWeekStatistics.WEEKSTATISTICS_FEATURE_KEY,
      fromWeekStatistics.reducer
    ),
    StoreModule.forFeature(fromWeeks.WEEKS_FEATURE_KEY, fromWeeks.reducer),
    StoreModule.forFeature(
      fromSessionStatistics.SESSIONSTATISTICS_FEATURE_KEY,
      fromSessionStatistics.reducer
    ),
    StoreModule.forFeature(
      fromWorkouts.WORKOUTS_FEATURE_KEY,
      fromWorkouts.reducer
    ),
    StoreModule.forFeature(
      fromCategories.CATEGORIES_FEATURE_KEY,
      fromCategories.reducer
    ),
    StoreModule.forFeature(
      fromV2Programs.V2PROGRAMS_FEATURE_KEY,
      fromV2Programs.reducer
    ),
    StoreModule.forFeature(
      fromV2Exercises.V2EXERCISES_FEATURE_KEY,
      fromV2Exercises.reducer
    ),
    StoreModule.forFeature(
      fromV2SetStatistics.V2SETSTATISTICS_FEATURE_KEY,
      fromV2SetStatistics.reducer
    ),
    StoreModule.forFeature(fromFoods.FOODS_FEATURE_KEY, fromFoods.reducer),
    StoreModule.forFeature(fromMeals.MEALS_FEATURE_KEY, fromMeals.reducer),
    StoreModule.forFeature(
      fromMealPlans.MEALPLANS_FEATURE_KEY,
      fromMealPlans.reducer
    ),
    EffectsModule.forFeature([
      ProgramsEffects,
      SessionItemsEffects,
      SessionsEffects,
      WeeksEffects,
      SessionItemStatisticsEffects,
      SetStatisticsEffects,
      ExercisesEffects,
      WeekStatisticsEffects,
      ProgramStatisticsEffects,
      SessionStatisticsEffects,
      WorkoutsEffects,
      CategoriesEffects,
      V2ExercisesEffects,
      V2SetStatisticsEffects,
      V2ProgramsEffects,
      MealPlansEffects,
      MealsEffects,
      FoodsEffects,
    ]),
    MatSnackBarModule,
  ],
  providers: [],
})
export class TrainingDomainModule {}
