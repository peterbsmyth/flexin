import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '@bod/shared/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@bod/shared/environments';

@Injectable()
export class ExerciseDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.API_URL}/exercises`);
  }

  getOne(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.API_URL}/exercises/${id}`);
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

  constructor(private http: HttpClient) {}
}
