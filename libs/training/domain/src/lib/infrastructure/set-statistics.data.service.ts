import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@bod/shared/environments';
import { SetStatistic } from '@bod/shared/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SetStatisticsDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<SetStatistic[]> {
    return this.http.get<SetStatistic[]>(`${this.API_URL}/set-statistics`);
  }

  getOne(id: number): Observable<SetStatistic> {
    return this.http.get<SetStatistic>(`${this.API_URL}/set-statistics/${id}`);
  }

  postOne(setStatistic: SetStatistic): Observable<SetStatistic> {
    return this.http.post<SetStatistic>(
      `${this.API_URL}/set-statistics`,
      setStatistic
    );
  }

  patchOne(setStatistic: Partial<SetStatistic>): Observable<SetStatistic> {
    return this.http.patch<SetStatistic>(
      `${this.API_URL}/set-statistics/${setStatistic.id}`,
      setStatistic
    );
  }

  constructor(private http: HttpClient) {}
}
