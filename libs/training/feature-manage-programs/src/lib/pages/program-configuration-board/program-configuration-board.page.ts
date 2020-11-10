import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  updateExercise,
  createProgram,
  V2ProgramsFacade,
} from '@bod/training/domain';
import { ExerciseV2, Workout } from '@bod/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  templateUrl: './program-configuration-board.page.html',
  styleUrls: ['./program-configuration-board.page.scss'],
})
export class ProgramConfigurationBoardPage implements OnInit {
  programNumber: FormControl = new FormControl(1);
  private _data: Workout[];
  private _validItems: boolean[] = [];
  private _invalidSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  invalid$: Observable<boolean> = this._invalidSubject.asObservable();

  constructor(private router: Router, public programsState: V2ProgramsFacade) {
    this.programsState.draftProgramConfiguration$
      .pipe(
        take(1),
        tap((data) => {
          data.forEach(() => this._validItems.push(false));
          const copiedDeep = data.map((workout) => ({
            ...workout,
          }));
          this._data = copiedDeep;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  onUpdate(data: any) {
    const item = data.workout;
    this._data.forEach((d, i) => {
      if (item.id === d.id) {
        this._data[i] = {
          ...item,
        };
      }
    });
  }

  onUpdateExercise(exercise: ExerciseV2) {
    this.programsState.dispatch(updateExercise({ exercise }));
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
      createProgram({
        data: this._data,
        number: this.programNumber.value,
      })
    );
  }
}
