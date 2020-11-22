import { Injectable } from '@angular/core';
import { SetStatistic } from '@bod/shared/models';
import { Observable, throwError } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SetStatisticDataService {
  private API_URL = environment.API_URL;

  getAllBySessionItemStatistic(id: number) {
    return this.http.get<SetStatistic[]>(
      `${this.API_URL}/session-item-statistics/${id}/set-statistics`
    );
  }

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

  patchOne(setStatistic: SetStatistic): Observable<SetStatistic> {
    return this.http.put<SetStatistic>(
      `${this.API_URL}/set-statistics/${setStatistic.id}`,
      setStatistic
    );
  }

  constructor(private http: HttpClient) {}
}
