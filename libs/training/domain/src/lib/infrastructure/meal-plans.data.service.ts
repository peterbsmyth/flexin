import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@bod/shared/environments';
import { MealPlan } from '@bod/shared/models';
import { Observable } from 'rxjs';

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
