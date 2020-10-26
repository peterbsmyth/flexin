import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NetworkStatusFacade } from '@bod/shared/domain';

@Component({
  selector: 'bod-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public networkStatus: NetworkStatusFacade,
    private snackBar: MatSnackBar
  ) {
    this.networkStatus.errors$
      .pipe(
        tap((message) => {
          if (message) {
            this.snackBar.open(message, '', {
              panelClass: 'error',
              duration: 5000,
            });
          }
        })
      )
      .subscribe();
  }
}
