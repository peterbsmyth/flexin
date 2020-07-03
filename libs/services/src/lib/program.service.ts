import { Injectable } from '@angular/core';
import { Week, Program, mockProgram } from '@bod/models';
import { Subject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private _program: Program = mockProgram;
  private _program$: Subject<Program> = new ReplaySubject(1);
  get program$(): Observable<Program> { return this._program$.asObservable(); }
  constructor() {
    this._program$.next(this._program);
  }

  createProgramFromOneWeek(name: string, week: Week): Program {
    this._program = {
      name,
      weeks: [week, week, week, week, week, week]
    };
    this._program$.next(this._program);
    return this._program;
  }
}
