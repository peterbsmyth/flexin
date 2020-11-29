import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@bod/shared/environments';
import { Meal } from '@bod/shared/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MealsDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.API_URL}/meals`);
  }

  getOne(id: number): Observable<Meal> {
    return this.http.get<Meal>(`${this.API_URL}/meals/${id}`);
  }

  saveOne(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(`${this.API_URL}/meals`, meal);
  }

  patchOne(meal: Meal): Observable<Meal> {
    return this.http.patch<Meal>(`${this.API_URL}/meals/${meal.id}`, meal);
  }

  constructor(private http: HttpClient) {}
}
