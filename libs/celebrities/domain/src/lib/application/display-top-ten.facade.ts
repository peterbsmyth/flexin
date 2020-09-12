import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AirtableDataService } from '../infrastructure/airtable.data.service';


@Injectable({ providedIn: 'root' })
export class DisplayTopTenFacade {
  constructor(
    private airtableService: AirtableDataService
  ) {}
  
}
