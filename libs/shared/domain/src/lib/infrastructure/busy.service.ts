import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class BusyService {
  private count = 0;
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  increment() {
    this.count = this.count + 1;

    if (this.count > 0) {
      this.loadingSubject.next(true);
    }
  }

  decrement() {
    this.count = this.count - 1;
    if (this.count < 0) {
      this.count = 0;
    }

    if (this.count === 0) {
      this.loadingSubject.next(false);
    }
  }
}
