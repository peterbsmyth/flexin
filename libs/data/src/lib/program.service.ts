import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Week, Program, mockProgram } from '@bod/models';
import { Subject, Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class ProgramService {
  private API_URL = 'https://9b6ba157-734d-42c3-8d2b-1d6d49f15793.mock.pstmn.io';
  private _program: Program = mockProgram;
  private _program$: Subject<Program> = new ReplaySubject(1);
  get program$(): Observable<Program> { return this._program$.asObservable(); }
  constructor(
    private http: HttpClient
  ) {
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

  getAll(): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.API_URL}/programs`);
  }

  getOne(id: number): Observable<Program> {
    return this.http.get<Program>(`${this.API_URL}/programs/${id}`);
  }
}
