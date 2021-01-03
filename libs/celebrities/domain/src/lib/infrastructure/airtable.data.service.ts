import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AirtableDataService {
  /**
   * TODO: assign API_URL to the URL of the airtable API
   */
  private API_URL;

  /**
   * TODO: enable the getAll method to get the celebrities from airtable
   */
  getAll(): Observable<unknown[]> {
    return this.http.get<unknown[]>(`${this.API_URL}/`);
  }

  constructor(private http: HttpClient) {}
}
