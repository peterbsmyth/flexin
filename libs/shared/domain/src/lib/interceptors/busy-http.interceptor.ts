import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BusyService } from '../infrastructure/busy.service';

@Injectable()
export class BusyHttpInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.busyService.increment();

    return next
      .handle(request)
      .pipe(finalize(() => this.busyService.decrement()));
  }
}
