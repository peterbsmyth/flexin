import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Celebrity } from './celebrity';
import { CELEBRITIES } from './mock-celebrities';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetCelebritiesService {
  private API_URL = "https://api.airtable.com/v0/appkd7lxi8RV4nNHU/Master?api_key=keyLErtb18ckdPhpm";
  
  getCelebs(): Observable <Celebrity[]> {
    return  of (CELEBRITIES);
  }

  getAll(): Observable <any> {
    return this.http.get<any>(`${this.API_URL}`);
  }

  constructor(private http: HttpClient) {}
}
