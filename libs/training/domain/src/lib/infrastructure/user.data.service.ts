import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@bod/shared/environments';
import { User } from '@bod/shared/models';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  private API_URL = environment.API_URL;
  private userSubject: ReplaySubject<User> = new ReplaySubject();
  public user$: Observable<User> = this.userSubject.asObservable();

  whoami(jwt: string): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwt}`,
    });

    this.http
      .get<User>(`${this.API_URL}/whoami`, { headers })
      .pipe(switchMap((user) => this.storage.set('user', user)))
      .subscribe();
  }

  clearJwt() {
    this.storage.clear().subscribe();
  }

  constructor(private http: HttpClient, private storage: StorageMap) {
    this.storage
      .watch('user')
      .pipe(
        tap((data: User) => {
          this.userSubject.next(data);
        })
      )
      .subscribe();
  }
}
