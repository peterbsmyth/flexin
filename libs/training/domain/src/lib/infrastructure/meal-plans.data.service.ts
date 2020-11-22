import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealPlan } from '@bod/shared/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@bod/shared/environments';

@Injectable({ providedIn: 'root' })
export class MealPlansDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<MealPlan[]> {
    return this.http.get<MealPlan[]>(`${this.API_URL}/meal-plans`);
  }

  getOne(id: number): Observable<MealPlan> {
    return this.http.get<MealPlan>(`${this.API_URL}/meal-plans/${id}`);
  }

  saveOne(mealPlan: MealPlan): Observable<MealPlan> {
    return this.http.post<MealPlan>(`${this.API_URL}/meal-plans`, mealPlan);
  }

  patchOne(mealPlan: MealPlan): Observable<MealPlan> {
    return this.http.patch<MealPlan>(
      `${this.API_URL}/meal-plans/${mealPlan.id}`,
      mealPlan
    );
  }

  constructor(private http: HttpClient) {}
}
