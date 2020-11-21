import { Injectable } from '@angular/core';
import { UserDataService } from '../infrastructure/user.data.service';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  user$ = this.backend.user$;

  jwt(jwt: string) {
    this.backend.whoami(jwt);
  }

  logout() {
    this.backend.clearJwt();
  }

  constructor(private backend: UserDataService) {}
}
