import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MealPlan } from '../entities/meal-plan';
import { MealPlanDataService } from '../infrastructure/meal-plan.data.service';


@Injectable({ providedIn: 'root' })
export class ManageMealPlansFacade {

    private mealPlanListSubject = new BehaviorSubject<MealPlan[]>([]); 
    mealPlanList$ = this.mealPlanListSubject.asObservable();

    constructor(private mealPlanDataService: MealPlanDataService) {
    }

    load(): void {
        this.mealPlanDataService.load().subscribe(
            mealPlanList => {
                this.mealPlanListSubject.next(mealPlanList)
            },
            err => {
                console.error('err', err);
            }
        );
    }

}
