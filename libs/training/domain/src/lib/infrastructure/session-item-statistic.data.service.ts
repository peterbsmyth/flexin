import { Injectable } from '@angular/core';
import { SessionItemStatistic } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class SessionItemStatisticDataService {
  private API_URL = environment.API_URL;

  getAllBySessionItem(id: number) {
    return this.http.get<SessionItemStatistic>(
      `${this.API_URL}/session-items/${id}/session-item-statistic`
    );
  }

  getAll(): Observable<SessionItemStatistic[]> {
    return this.http.get<SessionItemStatistic[]>(
      `${this.API_URL}/session-item-statistics`
    );
  }

  getAllWithSessionItem(): Observable<SessionItemStatistic[]> {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'sessionItem',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<SessionItemStatistic[]>(
      `${this.API_URL}/session-item-statistics`,
      { params }
    );
  }

  getOne(id: number): Observable<SessionItemStatistic> {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'sessionItem',
        },
        {
          relation: 'setStatistics',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<SessionItemStatistic>(
      `${this.API_URL}/session-item-statistics/${id}`,
      { params }
    );
  }

  postOne(
    sessionItemStatistic: SessionItemStatistic
  ): Observable<SessionItemStatistic> {
    return this.http.post<SessionItemStatistic>(
      `${this.API_URL}/session-item-statistics/`,
      sessionItemStatistic
    );
  }

  postOneBySessionItem(
    sessionItemStatistic: Partial<SessionItemStatistic>
  ): Observable<SessionItemStatistic> {
    return this.http.post<SessionItemStatistic>(
      `${this.API_URL}/session-items/${sessionItemStatistic.sessionItemId}/session-item-statistic`,
      {
        ...sessionItemStatistic,
        rpe: 0,
        notes: '',
      }
    );
  }

  patchOne(
    sessionItemStatistic: SessionItemStatistic
  ): Observable<SessionItemStatistic> {
    return this.http.patch<SessionItemStatistic>(
      `${this.API_URL}/session-item-statistics/${sessionItemStatistic.id}`,
      sessionItemStatistic
    );
  }

  constructor(private http: HttpClient) {}
}
