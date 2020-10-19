import { Injectable } from '@angular/core';
import { SessionItem } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class SessionItemDataService {
  private API_URL = environment.API_URL;

  getAllBySession(id: number) {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'exercise',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<SessionItem[]>(
      `${this.API_URL}/sessions/${id}/session-items`,
      { params }
    );
  }

  getAll(): Observable<SessionItem[]> {
    return this.http.get<SessionItem[]>(`${this.API_URL}/session-items`);
  }

  getOne(id: number): Observable<SessionItem> {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'exercise',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<SessionItem>(`${this.API_URL}/session-items/${id}`, {
      params,
    });
  }

  saveOne(sessionItem: SessionItem) {
    return this.http.post<SessionItem>(
      `${this.API_URL}/session-items`,
      sessionItem
    );
  }

  patchOne(sessionItem: SessionItem): Observable<SessionItem> {
    return this.http.patch<SessionItem>(
      `${this.API_URL}/session-items/${sessionItem.id}`,
      sessionItem
    );
  }

  constructor(private http: HttpClient) {}
}
