import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProgramsEffects } from './+state/programs/programs.effects';
import { SessionItemsEffects } from './+state/session-items/session-items.effects';
import { SessionsEffects } from './+state/sessions/sessions.effects';
import { WeeksEffects } from './+state/weeks/weeks.effects';
import { HttpClientModule } from '@angular/common/http';
import { SessionItemStatisticsEffects } from './+state/session-item-statistics/session-item-statistics.effects';
import { SetStatisticsEffects } from './+state/set-statistics/set-statistics.effects';
import { ExercisesEffects } from './+state/exercises/exercises.effects';
import { WeekStatisticsEffects } from './+state/week-statistics/week-statistics.effects';
import { ProgramStatisticsEffects } from './+state/program-statistics/program-statistics.effects';
import { SessionStatisticsEffects } from './+state/session-statistics/session-statistics.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WorkoutsEffects } from './+state/workouts/workouts.effects';
import { CategoriesEffects } from './+state/categories/categories.effects';
import { V2ProgramsEffects } from './+state/v2-programs/v2-programs.effects';
import { V2ExercisesEffects } from './+state/v2-exercises/v2-exercises.effects';
import { V2SetStatisticsEffects } from './+state/v2-set-statistics/v2-set-statistics.effects';
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
