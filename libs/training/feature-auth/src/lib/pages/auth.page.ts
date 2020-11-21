import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthFacade } from '@bod/training/domain';
import { filter, tap } from 'rxjs/operators';

@Component({
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(public auth: AuthFacade, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .pipe(
        filter((params) => !!params['jwt']),
        tap((params) => {
          this.auth.jwt(params['jwt']);
        })
      )
      .subscribe();
  }
}
