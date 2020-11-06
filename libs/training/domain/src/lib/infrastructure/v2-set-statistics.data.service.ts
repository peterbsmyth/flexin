import { Injectable } from '@angular/core';
import { SetStatisticV2 } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SetStatisticV2sDataService {
  private API_URL = environment.API_URL;

  getAll(): Observable<SetStatisticV2[]> {
    return this.http.get<SetStatisticV2[]>(`${this.API_URL}/set-statistics`);
  }

  getOne(id: number): Observable<SetStatisticV2> {
    return this.http.get<SetStatisticV2>(
      `${this.API_URL}/set-statistics/${id}`
    );
  }

  postOne(setStatistic: SetStatisticV2): Observable<SetStatisticV2> {
    return this.http.post<SetStatisticV2>(
      `${this.API_URL}/set-statistics`,
      setStatistic
    );
  }

  patchOne(setStatistic: SetStatisticV2): Observable<SetStatisticV2> {
    return this.http.put<SetStatisticV2>(
      `${this.API_URL}/set-statistics/${setStatistic.id}`,
      setStatistic
    );
  }

  constructor(private http: HttpClient) {}
}
