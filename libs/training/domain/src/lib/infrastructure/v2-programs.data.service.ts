import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProgramV2 } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { environment } from '@bod/shared/environments';

@Injectable()
export class ProgramsDataService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAll(): Observable<ProgramV2[]> {
    return this.http.get<ProgramV2[]>(`${this.API_URL}/programs`);
  }

  getOne(id: number): Observable<ProgramV2> {
    return this.http.get<ProgramV2>(`${this.API_URL}/programs/${id}`);
  }

  saveOne(program: ProgramV2): Observable<ProgramV2> {
    return this.http.post<ProgramV2>(`${this.API_URL}/programs`, program);
  }
}
