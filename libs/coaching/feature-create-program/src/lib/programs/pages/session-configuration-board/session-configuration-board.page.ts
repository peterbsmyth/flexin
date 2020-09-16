import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgramsFacade, ProgramsPageActions, SessionItemData } from '@bod/coaching/domain';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  templateUrl: './session-configuration-board.page.html',
  styleUrls: ['./session-configuration-board.page.scss'],
})
export class SessionConfigurationBoardPage implements OnInit {
  programName: FormControl = new FormControl('Program 1');
  private _data: SessionItemData[];
  incompleteSessionItems$: Observable<any[]>;

  constructor(private router: Router, public programsState: ProgramsFacade) {
    this.programsState.draftIncompleteSessionItems$
      .pipe(
        take(1),
        tap((data) => {
          const copiedDeep = data.map(({ exercise, sessionItem }) => ({
            exercise: {
              ...exercise
            },
            sessionItem: {
              ...sessionItem
            }
          }))
          this._data = copiedDeep;
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

  onClickCreateProgram() {
    this.programsState.dispatch(
      ProgramsPageActions.everythingExceptCreateProgram({ data: this._data })
    );
    this.programsState.dispatch(
      ProgramsPageActions.createProgram({
        name: this.programName.value,
      })
    );
  }
}
