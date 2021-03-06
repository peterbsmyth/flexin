import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@bod/shared/environments';
import { Workout } from '@bod/shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsDataService {
  private API_URL = environment.API_URL;

  getAllByProgram(id: number) {
    return this.http.get<Workout[]>(`${this.API_URL}/programs/${id}/workouts`);
  }

  getAll(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.API_URL}/workouts`);
  }

  getAllWhereExcerciseId(id: number) {
    const filter = JSON.stringify({
      where: {
        exerciseId: id,
      },
      include: [
        {
          relation: 'setStatistics',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<Workout[]>(`${this.API_URL}/workouts`, { params });
  }

  getOne(id: number): Observable<Workout> {
    const filter = JSON.stringify({
      include: [
        {
          relation: '',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<Workout>(`${this.API_URL}/workouts/${id}`, { params });
  }

  saveOne(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(`${this.API_URL}/workouts`, workout);
  }

  patchOne(workout: Partial<Workout>): Observable<undefined> {
    return this.http.patch<undefined>(
      `${this.API_URL}/workouts/${workout.id}`,
      workout
    );
  }

  patchMany(workouts: Partial<Workout>[]): Observable<undefined> {
    return this.http.patch<undefined>(`${this.API_URL}/workouts`, workouts);
  }

  constructor(private http: HttpClient) {}
}
