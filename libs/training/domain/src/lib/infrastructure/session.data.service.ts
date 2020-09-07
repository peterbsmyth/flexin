import { Injectable } from '@angular/core';
import { Session } from '@bod/shared/domain';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SessionDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.API_URL}/sessions`);
  }

  getOne(id: number): Observable<Session> {
    return this.http.get<Session>(`${this.API_URL}/sessions/${id}`);
  }

  constructor(
    private http: HttpClient
  ) { }
}
