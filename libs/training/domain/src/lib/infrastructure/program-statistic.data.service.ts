import { Injectable } from '@angular/core';
import { ProgramStatistic } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProgramStatisticDataService {
  private API_URL = environment.API_URL;

  getAllBySessionItemStatistic(id: number) {
    return this.http.get<ProgramStatistic[]>(
      `${this.API_URL}/session-item-statistics/${id}/program-statistic`
    );
  }

  getAll(): Observable<ProgramStatistic[]> {
    return this.http.get<ProgramStatistic[]>(
      `${this.API_URL}/program-statistics`
    );
  }

  getOne(id: number): Observable<ProgramStatistic> {
    return this.http.get<ProgramStatistic>(
      `${this.API_URL}/program-statistics/${id}`
    );
  }

  getOneByProgram(id: number): Observable<ProgramStatistic> {
    return this.http.get<ProgramStatistic>(
      `${this.API_URL}/programs/${id}/program-statistic`
    );
  }

  postOne(programStatistic: ProgramStatistic): Observable<ProgramStatistic> {
    return this.http.post<ProgramStatistic>(
      `${this.API_URL}/program-statistics`,
      programStatistic
    );
  }

  postOneByProgram(id: number): Observable<ProgramStatistic> {
    return this.http.post<ProgramStatistic>(
      `${this.API_URL}/programs/${id}/program-statistic`,
      {}
    );
  }

  putOne(programStatistic: ProgramStatistic): Observable<ProgramStatistic> {
    return this.http.put<ProgramStatistic>(
      `${this.API_URL}/program-statistics/${programStatistic.id}`,
      programStatistic
    );
  }

  constructor(private http: HttpClient) {}
}
