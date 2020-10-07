import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ErrorService {
  private _errorSubject: BehaviorSubject<string> = new BehaviorSubject('');
  public errors$: Observable<any> = this._errorSubject.asObservable();
  public addError(message: string): void {
    this._errorSubject.next(message);
  }
}
