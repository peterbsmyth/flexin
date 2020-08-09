import { Injectable } from '@angular/core';
import { Week, Session, mockWeek } from '@bod/models';
import { Subject, Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class WeekService {
  private _lastWeekId = 0;
  private _week: Week = mockWeek;
  private _week$: Subject<Week> = new ReplaySubject(1);

  get week$(): Observable<Week> { return this._week$.asObservable(); }
  constructor() {
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
}
