import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '@bod/shared/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@bod/shared/environments';

@Injectable({ providedIn: 'root' })
export class FoodsDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.API_URL}/foods`);
  }

  getOne(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.API_URL}/foods/${id}`);
  }

  saveOne(food: Food): Observable<Food> {
    return this.http.post<Food>(`${this.API_URL}/foods`, food);
  }

  patchOne(food: Food): Observable<Food> {
    return this.http.patch<Food>(`${this.API_URL}/foods/${food.id}`, food);
  }

  constructor(private http: HttpClient) {}
}
