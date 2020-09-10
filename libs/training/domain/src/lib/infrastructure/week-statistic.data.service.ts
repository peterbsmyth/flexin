import { Injectable } from '@angular/core';
import { WeekStatistic } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeekStatisticDataService {
  private API_URL = environment.API_URL;

  getAllBySessionItemStatistic(id: number) {
    return this.http.get<WeekStatistic[]>(`${this.API_URL}/session-item-statistics/${id}/week-statistic`);
  }

  getAll(): Observable<WeekStatistic[]> {
    return this.http.get<WeekStatistic[]>(`${this.API_URL}/week-statistics`);
  }

  getOne(id: number): Observable<WeekStatistic> {
    return this.http.get<WeekStatistic>(`${this.API_URL}/week-statistics/${id}`);
  }

  postOne(weekStatistic: WeekStatistic): Observable<WeekStatistic> {
    return this.http.post<WeekStatistic>(`${this.API_URL}/week-statistics`, weekStatistic);
  }

  putOne(weekStatistic: WeekStatistic): Observable<WeekStatistic> {
    return this.http.put<WeekStatistic>(`${this.API_URL}/week-statistics/${weekStatistic.id}`, weekStatistic);
  }

  constructor(
    private http: HttpClient
  ) { }
}
