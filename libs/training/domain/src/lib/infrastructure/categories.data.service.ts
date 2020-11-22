import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '@bod/shared/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@bod/shared/environments';

@Injectable({ providedIn: 'root' })
export class CategoriesDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.API_URL}/categories`);
  }

  getOne(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.API_URL}/categories/${id}`);
  }

  saveOne(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.API_URL}/categories`, category);
  }

  patchOne(category: Category): Observable<Category> {
    return this.http.patch<Category>(
      `${this.API_URL}/categories/${category.id}`,
      category
    );
  }

  constructor(private http: HttpClient) {}
}
