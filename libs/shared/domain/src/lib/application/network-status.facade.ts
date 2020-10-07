import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusyService } from '../infrastructure/busy.service';
import { ErrorService } from '../infrastructure/error.service';

@Injectable()
export class NetworkStatusFacade {
  public errors$: Observable<string> = this.errorService.errors$;
  public loading$: Observable<boolean> = this.busyService.loading$;

  constructor(
    private errorService: ErrorService,
    private busyService: BusyService
  ) {}
}
