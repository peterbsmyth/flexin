import { Injectable } from '@angular/core';
import { Week, Session, mockWeek } from '@bod/shared/domain';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeekService {
  private API_URL = 'https://9b6ba157-734d-42c3-8d2b-1d6d49f15793.mock.pstmn.io';
  private _lastWeekId = 0;
  private _week: Week = mockWeek;
  private _week$: Subject<Week> = new ReplaySubject(1);

  get week$(): Observable<Week> { return this._week$.asObservable(); }
  constructor(
    private http: HttpClient
  ) {
    this._week$.next(this._week);
  }

  createWeek(number: number, sessions: Session[]): Week {
    this._week = {
      id: ++this._lastWeekId,
      number,
      sessions
    };
    this._week$.next(this._week);
    return this._week;
  }

  getAll(): Observable<Week[]> {
    return this.http.get<Week[]>(`${this.API_URL}/weeks`);
  }

  getOne(id: number): Observable<Week> {
    return this.http.get<Week>(`${this.API_URL}/weeks/${id}`);
  }
}
