import { Injectable } from '@angular/core';
import { Workout } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class WorkoutsDataService {
  private API_URL = environment.API_URL;

  getAllByProgram(id: number) {
    return this.http.get<Workout[]>(`${this.API_URL}/programs/${id}/workouts`);
  }

  getAll(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.API_URL}/workouts`);
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

  constructor(private http: HttpClient) {}
}
