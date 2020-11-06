import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseV2 } from '@bod/shared/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@bod/shared/environments';

@Injectable()
export class ExercisesDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<ExerciseV2[]> {
    return this.http.get<ExerciseV2[]>(`${this.API_URL}/exercises`);
  }

  getOne(id: number): Observable<ExerciseV2> {
    return this.http.get<ExerciseV2>(`${this.API_URL}/exercises/${id}`);
  }

  saveOne(exercise: ExerciseV2): Observable<ExerciseV2> {
    return this.http.post<ExerciseV2>(`${this.API_URL}/exercises`, exercise);
  }

  patchOne(exercise: ExerciseV2): Observable<ExerciseV2> {
    return this.http.patch<ExerciseV2>(
      `${this.API_URL}/exercises/${exercise.id}`,
      exercise
    );
  }

  constructor(private http: HttpClient) {}
}
