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
import { ProgramsFacade } from './application/programs.facade';
import { SessionItemsFacade } from './application/session-items.facade';
import { SessionsFacade } from './application/sessions.facade';
import { WeeksFacade } from './application/weeks.facade';
import { ProgramDataService } from './infrastructure/program.data.service';
import { HttpClientModule } from '@angular/common/http';
import { SessionDataService } from './infrastructure/session.data.service';
import { SessionItemDataService } from './infrastructure/session-item.data.service';
import { WeekDataService } from './infrastructure/week.data.service';
import * as fromSessionItemStatistics from './+state/session-item-statistics/session-item-statistics.reducer';
import { SessionItemStatisticsEffects } from './+state/session-item-statistics/session-item-statistics.effects';
import { SessionItemStatisticsFacade } from './application/session-item-statistics.facade';
import { SessionItemStatisticDataService } from './infrastructure/session-item-statistic.data.service';
import * as fromSetStatistics from './+state/set-statistics/set-statistics.reducer';
import { SetStatisticsEffects } from './+state/set-statistics/set-statistics.effects';
import { SetStatisticsFacade } from './application/set-statistics.facade';
import { SetStatisticDataService } from './infrastructure/set-statistic.data.service';
import { ExerciseDataService } from './infrastructure/exercise.data.service';
import * as fromExercises from './+state/exercises/exercises.reducer';
import { ExercisesEffects } from './+state/exercises/exercises.effects';
import { ExercisesFacade } from './application/exercises.facade';
import { WeekStatisticDataService } from './infrastructure/week-statistic.data.service';
import * as fromWeekStatistics from './+state/week-statistics/week-statistics.reducer';
import { WeekStatisticsEffects } from './+state/week-statistics/week-statistics.effects';
import { WeekStatisticsFacade } from './application/week-statistics.facade';
import { ProgramStatisticDataService } from './infrastructure/program-statistic.data.service';
import * as fromProgramStatistics from './+state/program-statistics/program-statistics.reducer';
import { ProgramStatisticsEffects } from './+state/program-statistics/program-statistics.effects';
import { ProgramStatisticsFacade } from './application/program-statistics.facade';
import * as fromSessionStatistics from './+state/session-statistics/session-statistics.reducer';
import { SessionStatisticsEffects } from './+state/session-statistics/session-statistics.effects';
import { SessionStatisticsFacade } from './application/session-statistics.facade';
import { SessionStatisticDataService } from './infrastructure/session-statistic.data.service';
import { DraftProgramsDataService } from './infrastructure/draft-programs.data.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserDataService } from './infrastructure/user.data.service';
import * as fromWorkouts from './+state/workouts/workouts.reducer';
import { WorkoutsEffects } from './+state/workouts/workouts.effects';
import { WorkoutsFacade } from './application/workouts.facade';
import * as fromCategories from './+state/categories/categories.reducer';
import { CategoriesEffects } from './+state/categories/categories.effects';
import { CategoriesFacade } from './application/categories.facade';
import * as fromWorkoutStatistics from './+state/workout-statistics/workout-statistics.reducer';
import { WorkoutStatisticsEffects } from './+state/workout-statistics/workout-statistics.effects';
import { WorkoutStatisticsFacade } from './application/workout-statistics.facade';
import * as fromV2Programs from './+state/v2-programs/v2-programs.reducer';
import { V2ProgramsEffects } from './+state/v2-programs/v2-programs.effects';
import { V2ProgramsFacade } from './application/v2-programs.facade';
import * as fromV2Exercises from './+state/v2-exercises/v2-exercises.reducer';
import { V2ExercisesEffects } from './+state/v2-exercises/v2-exercises.effects';
import { V2ExercisesFacade } from './application/v2-exercises.facade';
import * as fromV2SetStatistics from './+state/v2-set-statistics/v2-set-statistics.reducer';
import { V2SetStatisticsEffects } from './+state/v2-set-statistics/v2-set-statistics.effects';
import { V2SetStatisticsFacade } from './application/v2-set-statistics.facade';
import * as fromFoods from './+state/foods/foods.reducer';
import { FoodsEffects } from './+state/foods/foods.effects';
import { FoodsFacade } from './application/foods.facade';
import * as fromMeals from './+state/meals/meals.reducer';
import { MealsEffects } from './+state/meals/meals.effects';
import { MealsFacade } from './application/meals.facade';
import * as fromMealPlans from './+state/meal-plans/meal-plans.reducer';
import { MealPlansEffects } from './+state/meal-plans/meal-plans.effects';
import { MealPlansFacade } from './application/meal-plans.facade';
import * as fromMealStatistics from './+state/meal-statistics/meal-statistics.reducer';
import { MealStatisticsEffects } from './+state/meal-statistics/meal-statistics.effects';
import { MealStatisticsFacade } from './application/meal-statistics.facade';

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
      fromWorkoutStatistics.WORKOUTSTATISTICS_FEATURE_KEY,
      fromWorkoutStatistics.reducer
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
    StoreModule.forFeature(
      fromMealStatistics.MEALSTATISTICS_FEATURE_KEY,
      fromMealStatistics.reducer
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
      WorkoutStatisticsEffects,
      CategoriesEffects,
      V2ExercisesEffects,
      V2SetStatisticsEffects,
      V2ProgramsEffects,
      MealStatisticsEffects,
      MealPlansEffects,
      MealsEffects,
      FoodsEffects,
    ]),
    MatSnackBarModule,
  ],
  providers: [
    ProgramDataService,
    SessionItemDataService,
    SessionItemStatisticDataService,
    SessionDataService,
    SetStatisticDataService,
    WeekDataService,
    ProgramsFacade,
    SessionItemsFacade,
    SessionsFacade,
    WeeksFacade,
    SessionItemStatisticsFacade,
    SetStatisticsFacade,
    ExerciseDataService,
    ExercisesFacade,
    WeekStatisticDataService,
    WeekStatisticsFacade,
    ProgramStatisticDataService,
    ProgramStatisticsFacade,
    SessionStatisticDataService,
    SessionStatisticsFacade,
    DraftProgramsDataService,
    UserDataService,
    WorkoutsFacade,
    CategoriesFacade,
    WorkoutStatisticsFacade,
    V2ProgramsFacade,
    V2ExercisesFacade,
    V2SetStatisticsFacade,
    FoodsFacade,
    MealsFacade,
    MealPlansFacade,
    MealStatisticsFacade,
  ],
})
export class TrainingDomainModule {}
