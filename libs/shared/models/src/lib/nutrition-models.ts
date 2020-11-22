import { Category, ProgramV2 } from './training.models';
import { User } from './user.models';

export interface Food {
  id: number;
  name: string; // chicken
  categories: Category[]; // fat, protein, carbohydrate, vegetable
  quantity: string[]; // 200g or 300g or 1.5 cups
  createdBy: User;
}

export interface Meal {
  id: number;
  program: ProgramV2;
  food: Food;
  week: number;
  day: number;
  order: number;
  chosenFood: Food;
}

export interface MealPlan {
  id: number;
  name: string;
  description: string;
}
