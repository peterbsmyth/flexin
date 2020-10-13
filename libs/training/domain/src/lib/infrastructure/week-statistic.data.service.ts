import { Injectable } from '@angular/core';
import { WeekStatistic } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class WeekStatisticDataService {
  private API_URL = environment.API_URL;

  getAllBySessionItemStatistic(id: number) {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'week',
        },
        {
          relation: 'sessionStatistics',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<WeekStatistic[]>(
      `${this.API_URL}/session-item-statistics/${id}/week-statistic`,
      { params }
    );
  }

  getAll(): Observable<WeekStatistic[]> {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'week',
        },
        {
          relation: 'sessionStatistics',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<WeekStatistic[]>(`${this.API_URL}/week-statistics`, {
      params,
    });
  }

  getOne(id: number): Observable<WeekStatistic> {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'week',
        },
        {
          relation: 'sessionStatistics',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<WeekStatistic>(
      `${this.API_URL}/week-statistics/${id}`,
      { params }
    );
  }

  getOneByWeek(id: number): Observable<WeekStatistic> {
    const filter = JSON.stringify({
      include: [
        {
          relation: 'sessionStatistics',
        },
      ],
    });
    const params: HttpParams = new HttpParams().set('filter', filter);

    return this.http.get<WeekStatistic>(
      `${this.API_URL}/weeks/${id}/week-statistic`,
      { params }
    );
  }

  postOne(weekStatistic: WeekStatistic): Observable<WeekStatistic> {
    return this.http.post<WeekStatistic>(
      `${this.API_URL}/week-statistics`,
      weekStatistic
    );
  }

  postOneByWeek(weekStatistic: WeekStatistic): Observable<WeekStatistic> {
    return this.http.post<WeekStatistic>(
      `${this.API_URL}/weeks/${weekStatistic.weekId}/week-statistic`,
      weekStatistic
    );
  }

  putOne(weekStatistic: WeekStatistic): Observable<WeekStatistic> {
    return this.http.put<WeekStatistic>(
      `${this.API_URL}/week-statistics/${weekStatistic.id}`,
      weekStatistic
    );
  }

  constructor(private http: HttpClient) {}
}
