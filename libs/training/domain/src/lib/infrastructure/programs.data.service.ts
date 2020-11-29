import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@bod/shared/environments';
import { Program } from '@bod/shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramsDataService {
  private API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.API_URL}/programs`);
  }

  getOne(id: number): Observable<Program> {
    return this.http.get<Program>(`${this.API_URL}/programs/${id}`);
  }

  saveOne(program: Program): Observable<Program> {
    return this.http.post<Program>(`${this.API_URL}/programs`, program);
  }
}
