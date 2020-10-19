import { Injectable } from '@angular/core';
import { Session } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SessionDataService {
  private API_URL = environment.API_URL;

  getAllByWeek(id: number) {
    return this.http.get<Session[]>(`${this.API_URL}/weeks/${id}/sessions`);
  }

  getAll(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.API_URL}/sessions`);
  }

  getOne(id: number): Observable<Session> {
    return this.http.get<Session>(`${this.API_URL}/sessions/${id}`);
  }

  saveOne(session: Session): Observable<Session> {
    return this.http.post<Session>(`${this.API_URL}/sessions`, session);
  }

  constructor(private http: HttpClient) {}
}
