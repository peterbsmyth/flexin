import { Injectable } from '@angular/core';
import { ProgramStatistic } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProgramStatisticDataService {
  private API_URL = environment.API_URL;

  getAllBySessionItemStatistic(id: number) {
    return this.http.get<ProgramStatistic[]>(`${this.API_URL}/session-item-statistics/${id}/program-statistic`);
  }

  getAll(): Observable<ProgramStatistic[]> {
    return this.http.get<ProgramStatistic[]>(`${this.API_URL}/program-statistics`);
  }

  getOne(id: number): Observable<ProgramStatistic> {
    return this.http.get<ProgramStatistic>(`${this.API_URL}/program-statistics/${id}`);
  }

  postOne(programStatistic: ProgramStatistic): Observable<ProgramStatistic> {
    return this.http.post<ProgramStatistic>(`${this.API_URL}/program-statistics`, programStatistic);
  }

  putOne(programStatistic: ProgramStatistic): Observable<ProgramStatistic> {
    return this.http.put<ProgramStatistic>(`${this.API_URL}/program-statistics/${programStatistic.id}`, programStatistic);
  }

  constructor(
    private http: HttpClient
  ) { }
}
