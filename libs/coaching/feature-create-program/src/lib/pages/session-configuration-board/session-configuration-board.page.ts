import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ProgramsFacade,
  ProgramsActions,
  SessionItemData,
  ExercisesActions,
} from '@bod/coaching/domain';
import { Exercise } from '@bod/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  templateUrl: './session-configuration-board.page.html',
  styleUrls: ['./session-configuration-board.page.scss'],
})
export class SessionConfigurationBoardPage implements OnInit {
  programName: FormControl = new FormControl('Program 1');
  private _data: SessionItemData[];
  private _validItems: boolean[] = [];
  incompleteSessionItems$: Observable<any[]>;
  private _invalidSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  invalid$: Observable<boolean> = this._invalidSubject.asObservable();

  constructor(private router: Router, public programsState: ProgramsFacade) {
    this.programsState.draftSessionConfiguration$
      .pipe(
        take(1),
        tap((data) => {
          data.forEach(() => this._validItems.push(false));
          const copiedDeep = data.map(({ exercise, sessionItem }) => ({
            exercise: {
              ...exercise,
            },
            sessionItem: {
              ...sessionItem,
            },
          }));
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

  onUpdateExercise(exercise: Exercise) {
    this.programsState.dispatch(ExercisesActions.updateExercise({ exercise }));
  }

  /**
   * onValidate will push false to invalidSubject, indicating the form has no errors,
   * when all the session items have a valid value of true.
   * @param valid the validity value of the session item
   * @param index the index of the session item
   */
  onValidate(valid: boolean, index: number) {
    this._validItems[index] = valid;
    if (this._validItems.every((item) => item)) {
      this._invalidSubject.next(false);
    } else {
      this._invalidSubject.next(true);
    }
  }

  onClickCreateProgram() {
    this.programsState.dispatch(
      ProgramsActions.createProgram({
        data: this._data,
        name: this.programName.value,
      })
    );
  }
}
