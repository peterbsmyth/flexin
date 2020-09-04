import { Injectable } from '@angular/core';
import { Week, Session, mockWeek } from '@bod/models';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeekService {
  private API_URL = 'https://30ef19c6-861b-43d6-8623-59fc434f085a.mock.pstmn.io';
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
