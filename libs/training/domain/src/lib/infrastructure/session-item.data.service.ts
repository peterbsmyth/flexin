import { Injectable } from '@angular/core';
import { SessionItem } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SessionItemDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<SessionItem[]> {
    return this.http.get<SessionItem[]>(`${this.API_URL}/session-items`);
  }

  getOne(id: number): Observable<SessionItem> {
    return this.http.get<SessionItem>(`${this.API_URL}/session-items/${id}`);
  }

  constructor(
    private http: HttpClient
  ) { }
}
