import { HttpClient, HttpParams } from '@angular/common/http';
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
    category: Partial<Category>
  ): Observable<{ exercise: Exercise; category: Category }> {
    return this.http
      .post<Category>(
        `${this.API_URL}/exercises/${exercise.id}/categories`,
        category
      )
      .pipe(
        map((response) => ({
          exercise,
          category: response,
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

  deleteIntensity(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/intensities/${id}`);
  }

  constructor(private http: HttpClient) {}
}
