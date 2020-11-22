import { ChangeDetectorRef, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NetworkStatusFacade } from '@bod/shared/domain';
import { AuthFacade } from '@bod/training/domain';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'bod-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  private currentUrlSubject: BehaviorSubject<string> = new BehaviorSubject('');
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public networkStatus: NetworkStatusFacade,
    private snackBar: MatSnackBar,
    public auth: AuthFacade,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {
    // this.router.events
    //   .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     map((event: NavigationEnd) => event.url.split('?')[0]),
    //     tap((url) => {
    //       this.currentUrlSubject.next(url);
    //     })
    //   )
    //   .subscribe();
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

  disable(url: string) {
    const currentUrl = this.currentUrlSubject.getValue();
    return currentUrl === url;
  }
}
