import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramsFacade, ProgramsPageActions } from '@bod/coaching/domain';
import { SessionItem } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  templateUrl: './session-configuration-board.page.html',
  styleUrls: ['./session-configuration-board.page.scss'],
})
export class SessionConfigurationBoardPage implements OnInit {
  private _data: any[];
  incompleteSessionItems$: Observable<any[]>;

  constructor(private router: Router, public programState: ProgramsFacade) {
    this.programState.draftIncompleteSessionItems$
      .pipe(
        take(1),
        tap((data) => {
          this._data = data;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  onUpdate(data: any) {
    const item = data.sessionItem;
    this._data.forEach((d, i) => {
      if (item.id === d.sessionItem.id) {
        this._data[i].sessionItem = {
          ...item,
        };
      }
    });
  }

  onClickNext() {
    this.programState.dispatch(
      ProgramsPageActions.everythingExceptCreateProgram({ data: this._data })
    );
    this.router.navigateByUrl('/programs/create/3');
  }
}
