import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../infrastructure/error.service';

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {
  constructor(private errorState: ErrorService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorState.addError(error.error.error.message);
        return throwError(error);
      })
    );
  }
}
