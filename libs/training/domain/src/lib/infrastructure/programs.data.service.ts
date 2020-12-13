import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@bod/shared/environments';
import { Program } from '@bod/shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramsDataService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Program[]> {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'workouts',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<Program[]>(`${this.API_URL}/programs`, { params });
  }

  getOne(id: number): Observable<Program> {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'workouts',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<Program>(`${this.API_URL}/programs/${id}`, { params });
  }

  saveOne(program: Program): Observable<Program> {
    return this.http.post<Program>(`${this.API_URL}/programs`, program);
  }
}
