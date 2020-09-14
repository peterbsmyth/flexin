import { Injectable } from '@angular/core';
import { Week } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeekDataService {
  private API_URL = environment.API_URL;

  getAllByProgram(id: number) {
    return this.http.get<Week[]>(`${this.API_URL}/programs/${id}/weeks`);
  }

  getAll(): Observable<Week[]> {
    return this.http.get<Week[]>(`${this.API_URL}/weeks`);
  }

  getOne(id: number): Observable<Week> {
    return this.http.get<Week>(`${this.API_URL}/weeks/${id}`);
  }

  saveOne(week: Week): Observable<Week> {
    return this.http.post<Week>(`${this.API_URL}/weeks`, week);
  }

  constructor(
    private http: HttpClient
  ) { }
}
