import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Celebrity } from '@bod/celebrities/domain';
import { Observable, of } from 'rxjs';
import { CELEBRITIES } from './mock-celebrities';

@Injectable({
  providedIn: 'root',
})
export class GetCelebritiesService {
  private API_URL =
    'https://api.airtable.com/v0/appkd7lxi8RV4nNHU/Master?api_key=keyLErtb18ckdPhpm';

  getCelebs(): Observable<Celebrity[]> {
    return of(CELEBRITIES);
  }

  getAll(): Observable<unknown> {
    return this.http.get<unknown>(`${this.API_URL}`);
  }

  constructor(private http: HttpClient) {}
}
