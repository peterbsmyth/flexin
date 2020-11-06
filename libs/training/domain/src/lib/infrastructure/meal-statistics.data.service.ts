import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealStatistic } from '@bod/shared/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@bod/shared/environments';

@Injectable()
export class MealStatisticsDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<MealStatistic[]> {
    return this.http.get<MealStatistic[]>(`${this.API_URL}/meal-statistics`);
  }

  getOne(id: number): Observable<MealStatistic> {
    return this.http.get<MealStatistic>(
      `${this.API_URL}/meal-statistics/${id}`
    );
  }

  saveOne(mealStatistic: MealStatistic): Observable<MealStatistic> {
    return this.http.post<MealStatistic>(
      `${this.API_URL}/meal-statistics`,
      mealStatistic
    );
  }

  patchOne(mealStatistic: MealStatistic): Observable<MealStatistic> {
    return this.http.patch<MealStatistic>(
      `${this.API_URL}/meal-statistics/${mealStatistic.id}`,
      mealStatistic
    );
  }

  constructor(private http: HttpClient) {}
}
