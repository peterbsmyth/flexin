import { Injectable } from '@angular/core';
import { SessionStatistic } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SessionStatisticDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<SessionStatistic[]> {
    return this.http.get<SessionStatistic[]>(
      `${this.API_URL}/session-statistics`
    );
  }

  getOne(id: number): Observable<SessionStatistic> {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'session',
        },
        {
          relation: 'sessionItemStatistics',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<SessionStatistic>(
      `${this.API_URL}/session-statistics/${id}`,
      { params }
    );
  }

  getOneBySession(id: number): Observable<SessionStatistic> {
    return this.http.get<SessionStatistic>(
      `${this.API_URL}/sessions/${id}/session-statistic`
    );
  }

  postOne(sessionStatistics: SessionStatistic): Observable<SessionStatistic> {
    return this.http.post<SessionStatistic>(
      `${this.API_URL}/session-statistics`,
      sessionStatistics
    );
  }

  postOneBySession(
    sessionStatistic: SessionStatistic
  ): Observable<SessionStatistic> {
    return this.http.post<SessionStatistic>(
      `${this.API_URL}/sessions/${sessionStatistic.sessionId}/session-statistic`,
      sessionStatistic
    );
  }

  putOne(sessionStatistics: SessionStatistic): Observable<SessionStatistic> {
    return this.http.put<SessionStatistic>(
      `${this.API_URL}/session-statistics/${sessionStatistics.id}`,
      sessionStatistics
    );
  }

  constructor(private http: HttpClient) {}
}
