import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@bod/shared/environments';
import { Category, Exercise, Intensity } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExercisesDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<Exercise[]> {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'categories',
        },
        {
          relation: 'intensities',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<Exercise[]>(`${this.API_URL}/exercises`, { params });
  }

  getOne(id: number): Observable<Exercise> {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'categories',
        },
        {
          relation: 'intensities',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<Exercise>(`${this.API_URL}/exercises/${id}`, {
      params,
    });
  }

  saveOne(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.API_URL}/exercises`, exercise);
  }

  patchOne(exercise: Exercise): Observable<Exercise> {
    return this.http.patch<Exercise>(
      `${this.API_URL}/exercises/${exercise.id}`,
      exercise
    );
  }

  saveCategory(
    exercise: Exercise,
    category: Category
  ): Observable<{ exercise: Exercise; category: Category }> {
    return this.http
      .post<Category>(`${this.API_URL}/exercises-categories`, {
        exerciseId: exercise.id,
        categoryId: category.id,
      })
      .pipe(
        map(() => ({
          exercise,
          category,
        }))
      );
  }

  deleteCategory(
    exercise: Exercise,
    category: Category
  ): Observable<{ exercise: Exercise; category: Category }> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        exerciseId: exercise.id,
        categoryId: category.id,
      },
    };

    return this.http
      .delete<Category>(`${this.API_URL}/exercises-categories`, options)
      .pipe(
        map(() => ({
          exercise,
          category,
        }))
      );
  }

  saveIntensity(
    exercise: Exercise,
    intensity: Partial<Intensity>
  ): Observable<{ exercise: Exercise; intensity: Intensity }> {
    return this.http
      .post<Intensity>(
        `${this.API_URL}/exercises/${exercise.id}/intensities`,
        intensity
      )
      .pipe(
        map((response) => ({
          exercise,
          intensity: response,
        }))
      );
  }

  deleteIntensity(id: number): Observable<unknown> {
    return this.http.delete(`${this.API_URL}/intensities/${id}`);
  }

  constructor(private http: HttpClient) {}
}
