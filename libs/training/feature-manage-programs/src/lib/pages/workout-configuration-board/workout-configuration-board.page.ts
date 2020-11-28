import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  updateExercise,
  createProgram,
  ProgramsFacade,
} from '@bod/training/domain';
import { Exercise, Workout } from '@bod/shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ExerciseDialog } from '@bod/training/ui-components';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './workout-configuration-board.page.html',
  styleUrls: ['./workout-configuration-board.page.scss'],
})
export class WorkoutConfigurationBoardPage implements OnInit {
  programNumber: FormControl = new FormControl(1);
  private _data: Workout[];
  private _invalidSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  invalid$: Observable<boolean> = this._invalidSubject.asObservable();

  constructor(
    private router: Router,
    public programsState: ProgramsFacade,
    public dialog: MatDialog
  ) {
    this.programsState.draftProgramConfiguration$
      .pipe(
        take(2),
        tap((data) => {
          this._data = data.slice(0);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  onUpdate(workout: Workout) {
    this._data.forEach((d, i) => {
      if (workout.id === d.id) {
        this._data[i] = {
          ...workout,
        };
      }
    });

    const invalid = !this._data.every(this.valid);
    this._invalidSubject.next(invalid);
  }

  valid(workout: Workout) {
    return (
      !!workout.sets &&
      (!!workout.reps || workout.amrap) &&
      workout.intensityId &&
      workout.tempo
    );
  }

  onUpdateExercise(workout: Workout) {
    const dialogRef = this.dialog.open(ExerciseDialog, {
      width: '800px',
      data: workout.exercise,
    });

    dialogRef.afterClosed().subscribe((exercise?: Exercise) => {
      if (exercise) {
        this.programsState.dispatch(updateExercise({ exercise }));
      }
    });
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
